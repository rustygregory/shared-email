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
    author: 'End User',
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
  {
    id: 3,
    author: 'End User',
    authorType: 'requester',
    timestamp: 'Jun 24 14:33',
    body: `Yes the address is correct - 500 Market St, Suite 400, San Francisco CA 94105. That's our main office. But I checked with our mail room and they don't have it either.

This is really frustrating because we needed those supplies for a client presentation this week.

Thanks,
Sarah Chen
VP of Operations | Global Retail HQ
(415) 555-0101`,
  },
  {
    id: 4,
    author: 'Roger Smith',
    authorType: 'agent',
    timestamp: 'Jun 25 08:20',
    body: `Hi Sarah,

I've filed a claim with the carrier and initiated a replacement shipment. You should receive the new order within 3-5 business days. I'll send you the new tracking number once it's available.

Is there anything else I can help with?

Best,
Roger`,
  },
]

export const interactionHistory = [
  { id: 4872, subject: 'Order #GR-29104 not received', date: 'Jun 24 09:15', status: 'Open' },
  { id: 4651, subject: 'Bulk order pricing inquiry', date: 'Jun 10 11:30', status: 'Solved' },
  { id: 4302, subject: 'Return authorization needed', date: 'May 15 14:22', status: 'Solved' },
]
