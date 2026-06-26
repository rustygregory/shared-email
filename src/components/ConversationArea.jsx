import styled from 'styled-components'
import { ticketData, ticketComments } from '../data/mockTicket'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
`

const Header = styled.div`
  padding: 16px 20px 0;
  flex-shrink: 0;
`

const Title = styled.h1`
  font-size: 18px;
  font-weight: 500;
  color: #2f3130;
  margin: 0;
`

const Meta = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 4px;
  padding-bottom: 12px;
  border-bottom: 1px solid #dcdcda;
  font-size: 12px;
  color: #8b8e89;
`

const MetaPipe = styled.span`
  color: #dcdcda;
`

const ViewSummary = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 12px 20px;
  border-bottom: 1px solid #eae9e8;
  font-size: 13px;
  color: #406cc4;
  cursor: pointer;
`

const Messages = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
`

const MessageBlock = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
`

const Avatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${props => props.$color || '#b7b7b3'};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: #fff;
  font-size: 12px;
  font-weight: 600;
`

const MessageContent = styled.div`
  flex: 1;
`

const MessageHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
`

const MessageAuthor = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: #2f3130;
`

const MessageTime = styled.span`
  font-size: 12px;
  color: #999b97;
`

const MessageBody = styled.div`
  font-size: 14px;
  color: #2f3130;
  line-height: 1.5;
  white-space: pre-wrap;
`

const ComposerArea = styled.div`
  border-top: 1px solid #eae9e8;
  flex-shrink: 0;
`

const ComposerHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 20px;
  font-size: 13px;
  color: #2f3130;
`

const ComposerReplyType = styled.span`
  display: flex;
  align-items: center;
  gap: 4px;
  color: #646864;
  cursor: pointer;
`

const ComposerTo = styled.span`
  color: #8b8e89;
`

const ComposerCC = styled.span`
  margin-left: auto;
  color: #406cc4;
  font-weight: 600;
  cursor: pointer;
`

const ComposerBody = styled.div`
  padding: 0 20px 12px;
  font-size: 14px;
  color: #999b97;
  min-height: 40px;
  font-style: italic;
`

const ComposerToolbar = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 10px 20px;
  border-top: 1px solid #f7f7f7;
`

const ToolbarBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #999b97;
  padding: 0;
  display: flex;
  align-items: center;
  &:hover { color: #2f3130; }
`

export default function ConversationArea() {
  return (
    <Container>
      <Header>
        <Title>{ticketData.subject}</Title>
        <Meta>
          <span>Via {ticketData.channel}</span>
          <MetaPipe>|</MetaPipe>
          <span>☹ {ticketData.sentiment}</span>
        </Meta>
      </Header>

      <ViewSummary>
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="#406cc4" strokeWidth="1.5">
          <circle cx="8" cy="8" r="6"/>
          <path d="M8 5v3l2 2" strokeLinecap="round"/>
        </svg>
        View ticket summary
      </ViewSummary>

      <Messages>
        {ticketComments.map(comment => (
          <MessageBlock key={comment.id}>
            <Avatar $color={comment.authorType === 'agent' ? '#404241' : '#406cc4'}>
              {comment.author[0]}
            </Avatar>
            <MessageContent>
              <MessageHeader>
                <MessageAuthor>{comment.author}</MessageAuthor>
                <MessageTime>{comment.timestamp}</MessageTime>
              </MessageHeader>
              <MessageBody>{comment.body}</MessageBody>
            </MessageContent>
          </MessageBlock>
        ))}
      </Messages>

      <ComposerArea>
        <ComposerHeader>
          <ComposerReplyType>
            <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="#646864" strokeWidth="1.5">
              <path d="M4 10l6-6v4c6 0 8 3 8 8-2-3-4-4-8-4v4l-6-6z" strokeLinejoin="round"/>
            </svg>
            Public reply
            <svg width="10" height="10" viewBox="0 0 16 16" fill="none" stroke="#646864" strokeWidth="1.5">
              <path d="M4 6l4 4 4-4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </ComposerReplyType>
          <ComposerTo>To</ComposerTo>
          <span style={{ fontSize: 13 }}>{ticketData.requester}</span>
          <ComposerCC>CC</ComposerCC>
        </ComposerHeader>
        <ComposerBody>Type your reply here...</ComposerBody>
        <ComposerToolbar>
          <ToolbarBtn><svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 13V3h3c1.7 0 3 1 3 2.5S7.7 8 6 8H3"/></svg></ToolbarBtn>
          <ToolbarBtn><svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 13l6-10"/><path d="M4 9h7"/></svg></ToolbarBtn>
          <ToolbarBtn><svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M10 3l-1 10M7 3l-1 10M3 6h11M2 10h11"/></svg></ToolbarBtn>
          <ToolbarBtn><svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="12" height="12" rx="1"/><path d="M2 10l3-3 2 2 4-4 3 3"/></svg></ToolbarBtn>
          <ToolbarBtn><svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M7 9l-2 2c-.7.7-.7 2 0 2.7s2 .7 2.7 0l4-4c.7-.7.7-2 0-2.7"/><path d="M9 7l2-2c.7-.7.7-2 0-2.7s-2-.7-2.7 0l-4 4c-.7.7-.7 2 0 2.7"/></svg></ToolbarBtn>
        </ComposerToolbar>
      </ComposerArea>
    </Container>
  )
}
