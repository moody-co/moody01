import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { FaCompass, FaTicketAlt, FaUser } from 'react-icons/fa'
import { FiRadio } from 'react-icons/fi'

function startsWith(pathname: string, base: string) {
  return pathname.startsWith(base)
}

export const MainTabsLayout = () => {
  const location = useLocation()
  const pathname = location.pathname

  // Actives
  const discoverActive = startsWith(pathname, '/app/discover')
  const liveActive = startsWith(pathname, '/app/live')
  const ticketsActive = startsWith(pathname, '/app/tickets')
  const profileActive = startsWith(pathname, '/app/profile')

  /**
   * ✅ Esconder a nav quando:
   * - estiver em detalhes do evento: /app/discover/:eventId
   * - ou nos fluxos do evento: /presence /verified /checkin /camera /thanks
   * - ou em detalhes do local: /app/venues/:venueId  (você disse que lá não vai ter bottom nav)
   */
  const hideNav =
    /^\/app\/discover\/[^/]+(\/presence|\/verified|\/checkin|\/camera|\/thanks)?$/.test(pathname) ||
    /^\/app\/venues\/[^/]+$/.test(pathname)

  // Colors (seu padrão)
  const baseColor = '#A279E8'
  const activeColor = 'rgba(255,255,255,0.95)'
  const inactiveColor = baseColor
  const colorFor = (active: boolean) => (active ? activeColor : inactiveColor)

  // ✅ estilo único: cada item ocupa 1/4 da barra
  const navItemStyle = (active: boolean): React.CSSProperties => ({
    flex: 1,
    textAlign: 'center',
    color: colorFor(active),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    userSelect: 'none',
  })

  return (
    <div style={{ minHeight: '100dvh', backgroundColor: '#000' }}>
      <Outlet />

      {!hideNav && (
        <div
          style={{
            position: 'fixed',
            bottom: 44,
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
            justifyContent: 'space-between',
            alignItems: 'center',
            fontFamily: 'Inter, system-ui, Arial',
          }}
        >
          {/* Discover */}
          <NavLink to="/app/discover" style={{ textDecoration: 'none', flex: 1 }}>
            <div style={navItemStyle(discoverActive)}>
              <FaCompass size={22} />
              <div style={{ fontSize: 12, marginTop: 6, fontWeight: 700 }}>Discover</div>
            </div>
          </NavLink>

          {/* Live */}
          <NavLink to="/app/live" style={{ textDecoration: 'none', flex: 1 }}>
            <div style={navItemStyle(liveActive)}>
              <FiRadio size={22} />
              <div style={{ fontSize: 12, marginTop: 6, fontWeight: 700 }}>Live</div>
            </div>
          </NavLink>

          {/* Tickets */}
          <NavLink to="/app/tickets" style={{ textDecoration: 'none', flex: 1 }}>
            <div style={navItemStyle(ticketsActive)}>
              <FaTicketAlt size={22} />
              <div style={{ fontSize: 12, marginTop: 6, fontWeight: 700 }}>Tickets</div>
            </div>
          </NavLink>

          {/* Profile */}
          <NavLink to="/app/profile" style={{ textDecoration: 'none', flex: 1 }}>
            <div style={navItemStyle(profileActive)}>
              <FaUser size={22} />
              <div style={{ fontSize: 12, marginTop: 6, fontWeight: 700 }}>Profile</div>
            </div>
          </NavLink>
        </div>
      )}
    </div>
  )
}
