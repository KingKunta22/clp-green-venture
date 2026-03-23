export const dynamic = "force-dynamic";

// app/admin/dashboard/seminars/page.tsx
import { getSeminars } from './actions'
import SeminarsClient from './SeminarsClient'

export default async function SeminarsPage() {
  const seminars = await getSeminars()
  return <SeminarsClient seminars={seminars} />
}