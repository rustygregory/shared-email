import styled from 'styled-components'

const ItemRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 4px 10px;
  border-radius: 4px;
  cursor: pointer;
  background: ${props => props.$selected ? '#f3f6fb' : 'transparent'};
  &:hover { background: ${props => props.$selected ? '#f3f6fb' : '#f7f7f7'}; }
`

const Radio = styled.input`
  width: 16px;
  height: 16px;
  cursor: pointer;
  accent-color: #406cc4;
  margin-top: 2px;
  flex-shrink: 0;
`

const AvatarCircle = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: ${props => props.$color || '#b7b7b3'};
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 10px;
  font-weight: 600;
  flex-shrink: 0;
`

const UserInfo = styled.div`
  flex: 1;
  min-width: 0;
`

const UserNameLink = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #406cc4;
  cursor: pointer;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
  &:hover { text-decoration: underline; }
`

const UserEmail = styled.div`
  font-size: 12px;
  color: #646864;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
`

const UserId = styled.div`
  font-size: 12px;
  color: #646864;
  margin-bottom: 3px;
`

const UserPhone = styled.div`
  font-size: 12px;
  color: #646864;
  margin-bottom: 3px;
`

const UserOrg = styled.div`
  font-size: 12px;
  color: #646864;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
`

const UserReason = styled.div`
  font-size: 12px;
  color: #646864;
  font-style: italic;
`

const Mark = styled.mark`
  background: #fff0c2;
  color: inherit;
  padding: 0;
  border-radius: 2px;
`

function getInitials(name) {
  return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
}

// Wrap the portions of `text` that match `query` in a highlight <mark>
function highlight(text, query) {
  if (query == null || text == null) return text
  const q = String(query).trim()
  if (!q) return text
  const str = String(text)
  const lower = str.toLowerCase()
  const needle = q.toLowerCase()
  const parts = []
  let i = 0
  let start = lower.indexOf(needle)
  if (start === -1) return str
  let key = 0
  while (start !== -1) {
    if (start > i) parts.push(str.slice(i, start))
    parts.push(<Mark key={key++}>{str.slice(start, start + needle.length)}</Mark>)
    i = start + needle.length
    start = lower.indexOf(needle, i)
  }
  if (i < str.length) parts.push(str.slice(i))
  return parts
}

export default function SharedEmailItem({ user, selected, onSelect, onOpenProfile, reason, showPhone, hideEmail, query }) {
  const handleRowClick = (e) => {
    if (e.target.closest('[data-name-link]')) return
    onSelect()
  }

  return (
    <ItemRow $selected={selected} onClick={handleRowClick}>
      <Radio
        type="radio"
        name="shared-email-selection"
        checked={selected}
        onChange={onSelect}
      />
      <AvatarCircle $color={user.avatarColor}>
        {getInitials(user.name)}
      </AvatarCircle>
      <UserInfo>
        <UserNameLink data-name-link onClick={onOpenProfile}>{highlight(user.name, query)}</UserNameLink>
        {!hideEmail && <UserEmail>{highlight(user.email, query)}</UserEmail>}
        {showPhone && user.phone && <UserPhone>{highlight(user.phone, query)}</UserPhone>}
        <UserOrg>{highlight(user.organization, query)}</UserOrg>
        <UserId>ID: {highlight(String(user.id), query)}</UserId>
        {reason && <UserReason>({reason})</UserReason>}
      </UserInfo>
    </ItemRow>
  )
}
