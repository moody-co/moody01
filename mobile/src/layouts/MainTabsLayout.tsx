import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { FaCompass, FaTicketAlt, FaUser } from 'react-icons/fa'

function isDiscoverActive(pathname: string) {
  return pathname.startsWith('/app/discover')
}

export const MainTabsLayout = () => {
  const location = useLocation()

  const discoverActive = isDiscoverActive(location.pathname)
  const ticketsActive = location.pathname.startsWith('/app/tickets')
  const profileActive = location.pathname.startsWith('/app/profile')

  // ✅ esconde nav quando estiver na página de detalhes: /app/discover/:id
 const hideNav = /^\/app\/discover\/[^/]+(\/presence|\/verified|\/checkin|\/camera|\/thanks)?$/.test(location.pathname)





  const baseColor = '#A279E8'
  const activeColor = 'rgba(255,255,255,0.95)'
  const inactiveColor = baseColor
  const colorFor = (active: boolean) => (active ? activeColor : inactiveColor)

  return (
    <div style={{ minHeight: '100dvh', backgroundColor: '#000' }}>
      <Outlet />

      {!hideNav && (
        <div
          style={{
            position: 'fixed',
            bottom: 44, // 👈 aqui você sobe/desce a barra
            left: '50%',
            transform: 'translateX(-50%)',
            width: '90%',
            maxWidth: 520,
            padding: '14px 10px',
            borderRadius: 999,
            background: '#130131',
            border: '2px solid rgba(162,121,232,0.55)',
            boxShadow: '0 16px 40px rgba(0,0,0,0.55)',
            zIndex: 1000,
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            fontFamily: 'Inter, system-ui, Arial',
          }}
        >
          <NavLink to="/app/discover" style={{ textDecoration: 'none' }}>
            <div style={{ width: 90, textAlign: 'center', color: colorFor(discoverActive) }}>
              <FaCompass size={22} />
              <div style={{ fontSize: 12, marginTop: 6, fontWeight: 700 }}>Discover</div>
            </div>
          </NavLink>

          <NavLink to="/app/tickets" style={{ textDecoration: 'none' }}>
            <div style={{ width: 90, textAlign: 'center', color: colorFor(ticketsActive) }}>
              <FaTicketAlt size={22} />
              <div style={{ fontSize: 12, marginTop: 6, fontWeight: 700 }}>Tickets</div>
            </div>
          </NavLink>

          <NavLink to="/app/profile" style={{ textDecoration: 'none' }}>
            <div style={{ width: 90, textAlign: 'center', color: colorFor(profileActive) }}>
              <FaUser size={22} />
              <div style={{ fontSize: 12, marginTop: 6, fontWeight: 700 }}>Profile</div>
            </div>
          </NavLink>
        </div>
      )}
    </div>
  )
}
