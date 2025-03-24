import { NextRequest, NextResponse } from 'next/server'
import { getCountryLocations } from '@/services/countries.service'


export async function GET(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
    try {
        const searchParams = req.nextUrl.searchParams as URLSearchParams
        const page = searchParams.get('page')
        const { slug } = await params
        const response = await getCountryLocations(slug, Number(page ?? '1'))
        return NextResponse.json(response)
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 })
    }
}
