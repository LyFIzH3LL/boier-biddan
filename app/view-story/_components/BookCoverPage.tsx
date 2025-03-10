import Image from 'next/image'
import React from 'react'

function BookCoverPage({ story }: any) {
    return (
        <div>
            <Image src={story?.coverImage || '/placeholder.jpg'} alt='cover' width={500} height={500}></Image>


        </div>
    )
}

export default BookCoverPage