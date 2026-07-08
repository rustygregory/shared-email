export const ticketData = {
  id: 4872,
  subject: 'Order #GR-29104 not received',
  status: 'Open',
  priority: 'Normal',
  type: 'Problem',
  brand: 'Global Retail',
  requester: 'James Wilson',
  requesterId: 10004,
  assignee: 'Support/Roger Smith',
  tags: ['shipping_issue', 'order_inquiry', 'language__en', 'sentiment__frustrated'],
  channel: 'web form',
  sentiment: 'Frustrated',
}

export const ticketComments = [
  {
    id: 1,
    author: '#10001',
    authorType: 'requester',
    timestamp: 'Jun 24 09:15',
    body: `Hi there,

I placed order #GR-29104 over two weeks ago and still haven't received it. The tracking number you provided shows it was delivered but I never got the package. Can someone please help?

Best regards,
Sarah Chen
Operations Department
Global Retail HQ`,
  },
  {
    id: 2,
    author: 'Roger Smith',
    authorType: 'agent',
    timestamp: 'Jun 24 10:42',
    body: `Hi,

Thank you for reaching out. I'm looking into order #GR-29104 now. I can see the tracking shows delivered on June 12th. Let me contact the carrier for more details.

Could you confirm the shipping address we have on file is correct?

Thanks,
Roger`,
  },
]

export const interactionHistory = [
  { id: 4872, subject: 'Order #GR-29104 not received', date: 'Jun 24 09:15', status: 'Open' },
  { id: 4651, subject: 'Bulk order pricing inquiry', date: 'Jun 10 11:30', status: 'Solved' },
  { id: 4302, subject: 'Return authorization needed', date: 'May 15 14:22', status: 'Solved' },
]
