import { useState } from 'react'
import { ThemeProvider } from './flora-theme/elements/ThemeProvider'
import { ToastProvider } from '@zendeskgarden/react-notifications'
import { Combobox, Field, Option } from '@zendeskgarden/react-dropdowns'
import { TopBar, MainNav } from 'zendesk-globalnav-template'
import styled from 'styled-components'
import TicketView from './components/TicketView'
import CustomerProfilePage from './components/CustomerProfilePage'
import TabBar from './components/TabBar'

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  background-color: #f8f9f9;
  overflow: hidden;
`

const ContentRow = styled.div`
  display: flex;
  flex: 1;
  min-height: 0;
  width: 100%;
  overflow: hidden;
`

const MainContent = styled.main`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
  background: #ffffff;
  border-radius: 8px 0px 0px 0px;
  box-shadow: 0px 0px 4px rgba(10, 13, 14, 0.16);
  overflow: hidden;
`

const TopBarRow = styled.div`
  position: relative;
  flex-shrink: 0;
`

const TabBarOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 140px;
  height: 100%;
  display: flex;
  align-items: center;
  z-index: 10;
`

const ToggleOverlay = styled.div`
  position: absolute;
  top: 0;
  right: 380px;
  height: 100%;
  display: flex;
  align-items: center;
  z-index: 10;
`

const ModeFieldWrapper = styled.div`
  min-width: 160px;
`

const ViewArea = styled.div`
  flex: 1;
  overflow: hidden;
`

export default function App() {
  const [currentProduct, setCurrentProduct] = useState('support')
  const [activeNavItem, setActiveNavItem] = useState(0)
  const [isSubnavExpanded, setIsSubnavExpanded] = useState(false)
  const [mode, setMode] = useState(() => localStorage.getItem('shared-email-mode') || 'mvp')

  const handleModeChange = (newMode) => {
    setMode(newMode)
    localStorage.setItem('shared-email-mode', newMode)
  }
  const [openTabs, setOpenTabs] = useState([
    { id: 'ticket-4872', type: 'ticket', title: 'Order #GR-29104 not rec...', ticketId: '4872' }
  ])
  const [activeTab, setActiveTab] = useState('ticket-4872')

  const handleOpenProfile = (user) => {
    const tabId = `user-${user.id}`
    if (!openTabs.find(t => t.id === tabId)) {
      setOpenTabs(prev => [...prev, { id: tabId, type: 'profile', title: user.name, user }])
    }
    setActiveTab(tabId)
  }

  const handleCloseTab = (tabId) => {
    setOpenTabs(prev => prev.filter(t => t.id !== tabId))
    if (activeTab === tabId) {
      setActiveTab('ticket-4872')
    }
  }

  const activeTabData = openTabs.find(t => t.id === activeTab)

  return (
    <ThemeProvider>
      <ToastProvider zIndex={1000} placementProps={{ 'top-end': { style: { top: '72px', right: '40px' } } }}>
      <PageContainer>
        <TopBarRow>
          <TopBar
            currentProduct={currentProduct}
            onProductChange={setCurrentProduct}
          />
          <TabBarOverlay>
            <TabBar
              openTabs={openTabs}
              activeTab={activeTab}
              onTabClick={setActiveTab}
              onTabClose={handleCloseTab}
            />
          </TabBarOverlay>
          <ToggleOverlay>
            <ModeFieldWrapper>
              <Field>
                <Combobox
                  isCompact
                  isEditable={false}
                  inputValue={mode === 'mvp' ? 'MVP' : mode === 'mvp2' ? 'MVP v2' : mode === 'scaled' ? 'Scaled' : 'Workspace'}
                  selectionValue={mode}
                  onChange={({ selectionValue }) => { if (selectionValue) handleModeChange(selectionValue) }}
                >
                  <Option value="mvp">MVP</Option>
                  <Option value="mvp2">MVP v2</Option>
                  <Option value="scaled">Scaled</Option>
                  <Option value="workspace">Workspace</Option>
                </Combobox>
              </Field>
            </ModeFieldWrapper>
          </ToggleOverlay>
        </TopBarRow>
        <ContentRow>
          <MainNav
            currentProduct="support"
            activeNavItem={activeNavItem}
            setActiveNavItem={setActiveNavItem}
            isSubnavExpanded={isSubnavExpanded}
            setIsSubnavExpanded={setIsSubnavExpanded}
          />
          <MainContent>
            <ViewArea>
              <div style={{ display: activeTabData?.type === 'ticket' ? 'contents' : 'none' }}>
                <TicketView onOpenProfile={handleOpenProfile} mode={mode} />
              </div>
              {activeTabData?.type === 'profile' && (
                <CustomerProfilePage user={activeTabData.user} mode={mode} />
              )}
            </ViewArea>
          </MainContent>
        </ContentRow>
      </PageContainer>
      </ToastProvider>
    </ThemeProvider>
  )
}
