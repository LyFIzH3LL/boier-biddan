import React from 'react'

function DashboardHeader() {
    return (
        <div className='p-7 bg-primary text-white flex justify-between items-center'>
            <h2 className='font-noto-sans-serif font-bold lg:text-3xl md:text-2xl text-xl'>আমার গল্পসমূহ</h2>
            <div className='flex gap-3 items-center'>
                <span className='font-noto-sans-serif lg:text-2xl md:text-xl text-xl'>আপনার সকল গল্প এখানে</span>
            </div>
        </div>
    )
}

export default DashboardHeader