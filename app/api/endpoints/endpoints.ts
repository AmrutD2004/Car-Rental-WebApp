export const getCars = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/getcars`)
    return await response.json()
}

export const getCarById = async (id: number) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/getcarbyid/${id}`)
    return await response.json()
}

export const editCar = async (id: number, payload: any) => {

    const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/editcar/${id}`,
        {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        }
    )

    if (!response.ok) {
        const error = await response.text()
        throw new Error(error)
    }

    return await response.json()
}


export const deleteCar = async (id: number) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/delete/${id}`, {
        method: 'DELETE'
    })
    return await response.json()
}

export const bookCarAPI = async (payload: {}) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/book/car`, {
        method: 'POST',
        body: JSON.stringify(payload)
    })
    return await response.json()
}

export const getAllMyBookings = async (id: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/getallmybookings/${id}`, {
        method: 'GET'
    })
    return await response.json()
}

export const getallbookings = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/getallbookings`, {
        method: 'GET'
    })
    return await response.json()
}

export const changeStatus = async (status: string, id: number) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/changestatus/${id}`, {
        method: 'PUT',
        body: JSON.stringify({status})
    })
    return await response.json()
}