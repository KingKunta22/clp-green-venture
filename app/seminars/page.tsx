// app/seminars/page.tsx
import { getSeminars } from './actions'
import SeminarsClient from './SeminarsClient'

export default async function SeminarsPage() {
  const seminars = await getSeminars()
  console.log('[SeminarsPage] seminars:', seminars); // Add this
  return <SeminarsClient initialSeminars={seminars} />
}