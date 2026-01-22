// mobile/src/App.tsx
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import { LoginScreen } from './features/auth/LoginScreen'
import { VibeSelectionScreen } from './features/vibes/VibeSelectionScreen'

import { MainTabsLayout } from './layouts/MainTabsLayout'
import { DiscoverListScreen } from './features/discover/DiscoverListScreen'
import { EventDetailsScreen } from './features/discover/EventDetailsScreen'
import { TicketsScreen } from './features/tickets/TicketsScreen'
import { ProfileScreen } from './features/profile/ProfileScreen'
import { PresenceCheckScreen } from './features/presence/PresenceCheckScreen'
import { PresenceVerifiedScreen } from './features/presence/PresenceVerifiedScreen'
import { QuickCheckinScreen } from './features/checkin/QuickCheckinScreen'
import { CheckinCameraScreen } from './features/checkin/CheckinCameraScreen'
import { CheckinThanksScreen } from './features/checkin/CheckinThanksScreen'


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Root */}
        <Route path="/" element={<Navigate to="/auth" replace />} />

        {/* Auth */}
        <Route path="/auth" element={<LoginScreen />} />
        <Route path="/auth/vibes" element={<VibeSelectionScreen />} />

        {/* Tabs */}
        <Route path="/app" element={<MainTabsLayout />}>
          <Route index element={<Navigate to="/app/discover" replace />} />

          <Route path="discover" element={<DiscoverListScreen />} />
          <Route path="discover/:eventId" element={<EventDetailsScreen />} />
          <Route path="discover/:eventId/presence" element={<PresenceCheckScreen />} />
          <Route path="discover/:eventId/verified" element={<PresenceVerifiedScreen />} />
          <Route path="discover/:eventId/checkin" element={<QuickCheckinScreen />} />
          <Route path="discover/:eventId/camera" element={<CheckinCameraScreen />} />
          <Route path="discover/:eventId/thanks" element={<CheckinThanksScreen />} />
          
          <Route path="tickets" element={<TicketsScreen />} />
          <Route path="/profile" element={<ProfileScreen />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/auth" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
