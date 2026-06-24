import { Navbar } from '@/components/ui/navbar'

const STAR = '#7DDFFF'
const STAR_GLOW = '0 0 12px rgba(125,223,255,0.9), 0 0 30px rgba(125,223,255,0.5)'

export const metadata = {
  title: 'Aviso de Privacidad — Oakframe Agency',
  description: 'Aviso de privacidad de Oakframe Agency conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares.',
}

export default function AvisoPrivacidad() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen px-6 pt-32 pb-24" style={{ background: '#070707', color: '#e8e8e8' }}>
        <div className="max-w-2xl mx-auto">

          <p className="text-xs uppercase tracking-[0.4em] font-mono mb-4" style={{ color: STAR, textShadow: STAR_GLOW }}>
            Legal
          </p>
          <h1 className="text-3xl md:text-4xl font-semibold mb-2" style={{ color: '#e8e8e8' }}>
            Aviso de Privacidad
          </h1>
          <p className="text-xs font-mono mb-16" style={{ color: '#333' }}>Última actualización: junio 2025</p>

          <div className="space-y-10 text-sm leading-relaxed" style={{ color: '#555' }}>

            <section>
              <h2 className="text-base font-semibold mb-3" style={{ color: '#c8c8c8' }}>1. Responsable</h2>
              <p>
                Oakframe Agency, con domicilio en Puebla, México, es responsable del tratamiento de sus datos personales
                conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP).
              </p>
              <p className="mt-2">Contacto: <a href="mailto:hola@oakframe.mx" style={{ color: STAR }}>hola@oakframe.mx</a></p>
            </section>

            <section>
              <h2 className="text-base font-semibold mb-3" style={{ color: '#c8c8c8' }}>2. Datos personales recabados</h2>
              <p>A través del formulario de contacto en nuestro sitio web recabamos:</p>
              <ul className="mt-2 space-y-1 list-none">
                {['Nombre completo', 'Correo electrónico', 'Descripción del proyecto o mensaje'].map(item => (
                  <li key={item} className="flex items-start gap-2">
                    <span style={{ color: STAR }}>—</span> {item}
                  </li>
                ))}
              </ul>
              <p className="mt-3">No recabamos datos sensibles, financieros ni de menores de edad.</p>
            </section>

            <section>
              <h2 className="text-base font-semibold mb-3" style={{ color: '#c8c8c8' }}>3. Finalidades del tratamiento</h2>
              <p>Sus datos son utilizados exclusivamente para:</p>
              <ul className="mt-2 space-y-1 list-none">
                {[
                  'Responder a sus solicitudes de cotización o información',
                  'Dar seguimiento a proyectos contratados',
                  'Enviar información relacionada con los servicios solicitados',
                ].map(item => (
                  <li key={item} className="flex items-start gap-2">
                    <span style={{ color: STAR }}>—</span> {item}
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-base font-semibold mb-3" style={{ color: '#c8c8c8' }}>4. Transferencia de datos</h2>
              <p>
                Sus datos personales no serán transferidos a terceros sin su consentimiento, salvo las excepciones
                previstas en el artículo 37 de la LFPDPPP o cuando sea necesario para prestar el servicio contratado.
                Utilizamos Formspree como procesador de formularios; sus datos son transmitidos de forma segura a través
                de dicho servicio.
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold mb-3" style={{ color: '#c8c8c8' }}>5. Derechos ARCO</h2>
              <p>
                Usted tiene derecho a Acceder, Rectificar, Cancelar u Oponerse al tratamiento de sus datos personales.
                Para ejercer estos derechos envíe un correo a{' '}
                <a href="mailto:hola@oakframe.mx" style={{ color: STAR }}>hola@oakframe.mx</a> con el asunto
                "Derechos ARCO" indicando su nombre completo y la solicitud específica.
                Responderemos en un plazo máximo de 20 días hábiles.
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold mb-3" style={{ color: '#c8c8c8' }}>6. Cambios al aviso</h2>
              <p>
                Cualquier modificación a este aviso de privacidad será publicada en esta misma página. Le recomendamos
                revisarlo periódicamente.
              </p>
            </section>

          </div>

          <div className="mt-16 pt-8" style={{ borderTop: '1px solid #1a1a1a' }}>
            <a href="/" className="text-xs font-mono transition-colors" style={{ color: '#333' }}
              onMouseEnter={e => (e.currentTarget.style.color = STAR)}
              onMouseLeave={e => (e.currentTarget.style.color = '#333')}
            >
              ← Volver al inicio
            </a>
          </div>

        </div>
      </main>
    </>
  )
}
