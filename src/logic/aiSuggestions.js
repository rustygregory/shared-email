export function getAISuggestions(ticketComments, sharedUsers) {
  const scores = {}
  const reasons = {}

  sharedUsers.forEach(user => { scores[user.id] = 0; reasons[user.id] = [] })

  ticketComments.forEach(comment => {
    if (comment.authorType !== 'requester') return

    const text = comment.body.toLowerCase()
    const lines = comment.body.split('\n')
    const signatureBlock = lines.slice(-5).join('\n').toLowerCase()

    sharedUsers.forEach(user => {
      const fullName = user.name.toLowerCase()
      const firstName = user.name.split(' ')[0].toLowerCase()

      const signaturePatterns = [
        `best regards,\n${fullName}`,
        `regards,\n${fullName}`,
        `thanks,\n${fullName}`,
        `thank you,\n${fullName}`,
        `sincerely,\n${fullName}`,
        `cheers,\n${fullName}`,
        `best,\n${fullName}`,
        `- ${fullName}`,
      ]

      signaturePatterns.forEach(pattern => {
        if (text.includes(pattern)) {
          scores[user.id] += 10
          if (!reasons[user.id].includes('Name in signature')) reasons[user.id].push('Name in signature')
        }
      })

      if (signatureBlock.includes(fullName)) {
        scores[user.id] += 8
        if (!reasons[user.id].includes('Name in signature')) reasons[user.id].push('Name in signature')
      }

      if (text.includes(fullName) && !signatureBlock.includes(fullName)) {
        scores[user.id] += 5
        if (!reasons[user.id].includes('Name mentioned in comment')) reasons[user.id].push('Name mentioned in comment')
      }

      if (signatureBlock.includes(firstName) && firstName.length > 3) {
        scores[user.id] += 3
        if (!reasons[user.id].includes('Name in signature')) reasons[user.id].push('Name in signature')
      }

      if (user.phone && text.includes(user.phone.replace(/[^\d]/g, '').slice(-10))) {
        scores[user.id] += 6
        if (!reasons[user.id].includes('Phone number match')) reasons[user.id].push('Phone number match')
      }

      if (user.organization && text.includes(user.organization.toLowerCase())) {
        scores[user.id] += 3
        if (!reasons[user.id].includes('Organization match')) reasons[user.id].push('Organization match')
      }

      if (user.notes && user.notes.toLowerCase().split(' ').some(word =>
        word.length > 3 && signatureBlock.includes(word.toLowerCase())
      )) {
        scores[user.id] += 4
        if (!reasons[user.id].includes('Role match in signature')) reasons[user.id].push('Role match in signature')
      }
    })
  })

  return Object.entries(scores)
    .filter(([, score]) => score > 0)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([id]) => {
      const user = sharedUsers.find(u => u.id === parseInt(id))
      if (user) user.reason = reasons[id].join(', ')
      return user
    })
    .filter(Boolean)
}
