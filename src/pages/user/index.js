import Classes from '@/components/user/Classes'
import Footer from '@/components/user/Footer'
import Header from '@/components/user/Header'
import Hero from '@/components/user/Hero'
import MemberShip from '@/components/user/MemberShip'
import Services from '@/components/user/Services'
import Team from '@/components/user/Team'
import React from 'react'

function User() {
    return (
        <>
            <Header />
            <Hero />
            <Services />
            <Classes />
            <Team />
            <MemberShip />
            <Footer />
        </>
    )
}

export default User