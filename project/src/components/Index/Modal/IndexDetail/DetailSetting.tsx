import { BoardFrame } from '@components/common/Board/Board'
import React from 'react'
import { useParams } from 'react-router-dom'

function DetailSetting() {
    // const param = useParams()
    // console.log(param)

    const myObject = {
        product: 'Live JSON generator',
        version: 3.1,
        releaseDate: '2014-06-25T00:00:00.000Z',
        demo: true,
        person: {
            id: 12345,
            name: 'John Doe',
            phones: {
                home: '800-123-4567',
                mobile: '877-123-1234',
            },
            email: ['jd@example.com', 'jd@example.org'],
            dateOfBirth: '1980-01-02T00:00:00.000Z',
            registered: true,
            emergencyContacts: [
                {
                    name: 'Jane Doe',
                    phone: '888-555-1212',
                    relationship: 'spouse',
                },
                {
                    name: 'Justin Doe',
                    phone: '877-123-1212',
                    relationship: {
                        dsfksz: 'dasjflsa',
                        dkfa: { dfkjsal: { dfssfd: 'djkal' } },
                    },
                },
            ],
        },
    }

    const formattedObject = JSON.stringify(myObject, null, 2)

    return (
        <>
            <BoardFrame width="100%" height="80vh" variant="blueBoard">
                <pre>{formattedObject}</pre>
            </BoardFrame>
        </>
    )
}

export default DetailSetting
