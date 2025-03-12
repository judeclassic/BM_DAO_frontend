"use client"
import { ArrowDownIcon, ArrowRightIcon } from '@/app/(routes)/dashboard/_components/svg-icons'
import { CourseLeft, CourseRight, CourseWrapper, ProgressWrapper, Wrapp } from '@/app/styles/academy.style'
import Image from 'next/image'
import React, { use, useState } from 'react'

const Moderators = () => {
  const [showCurr, setShowCurr] = useState(true);
  const [showOver, setShowOver] = useState(true);
  return (
    <CourseWrapper>
        <CourseLeft>
            <h2>Introduction to Course</h2>
            <p>We are decentralized autonomous organization that provides a range of services to help you build, grow and promote your crypto and NFT project. Whether you need Collab Managers, Chat Engagers, Moderators or Twitter Raiders, we have the expertise and experience to revolutionize your community engagement. We are decentralized autonomous organization that provides a range of services to help you build, grow and promote your crypto and NFT project. Whether you need Collab Managers, Chat Engagers, Moderators or Twitter Raiders, we have the expertise and experience to revolutionize your community engagement. We are decentralized autonomous organization that provides a range of services to help you build, grow and promote your crypto and NFT project. Whether you need Collab Managers, </p>
            <iframe width="560" height="315" src="https://www.youtube.com/embed/Ades3pQbeh8" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
            <div className='control'>
                <button><Image src="/expand-left.svg" alt={"arrow"} height={24} width={24} /><span>Previous</span></button>
                <button><span>Next</span><Image src="/expand-right.svg" alt={"arrow"}  height={24} width={24} /></button>
            </div>
        </CourseLeft>
        <CourseRight>
            <Wrapp>
                <h2><span>Course Overview</span><button onClick={() => setShowOver(!showOver)}>{showOver ? <ArrowDownIcon /> : <ArrowRightIcon />}</button></h2>
                {showOver && <div className='dash-r'></div>}
                {
                    showOver ? 
                        ( <p>Each level of the referral program will offer different reward percentages for referral earnings. When a new member signs up using the referral link or code, they will be associated with the referring member and placed in the corresponding level of hte referral program.</p>)
                        : null
                }
            </Wrapp>
           
            <div className='dash'></div>
            <Wrapp>
                <h2><span>Curriculum</span><button onClick={() => setShowCurr(!showCurr)}>{showCurr ? <ArrowDownIcon /> : <ArrowRightIcon />}</button></h2>
                {showCurr && <div className='dash-r'></div>}
                {
                    showCurr ? (
                        <ProgressWrapper>
                            <div><p>Introduction to Course</p><Image src="/complete.svg" alt={"arrow"}  height={24} width={24} /></div>
                            <div><p>Introduction to Course</p><Image src="/complete.svg" alt={"arrow"}  height={24} width={24} /></div>
                            <div><p>Introduction to Course</p><Image src="/complete.svg" alt={"arrow"}  height={24} width={24} /></div>
                            <div><p>Introduction to Course</p><Image src="/complete.svg" alt={"arrow"}  height={24} width={24} /></div>
                            <div><p>Introduction to Course</p><Image src="/complete.svg" alt={"arrow"}  height={24} width={24} /></div>
                            <div><p>Introduction to Course</p><Image src="/complete.svg" alt={"arrow"}  height={24} width={24} /></div>
                            <div><p>Introduction to Course</p><Image src="/incomplete.svg" alt={"arrow"}  height={24} width={24} /></div>
                            <div><p>Introduction to Course</p><Image src="/incomplete.svg" alt={"arrow"}  height={24} width={24} /></div>
                            <div><p>Introduction to Course</p><Image src="/incomplete.svg" alt={"arrow"}  height={24} width={24} /></div>
                            <div><p>Introduction to Course</p><Image src="/incomplete.svg" alt={"arrow"}  height={24} width={24} /></div>
                            <div><p>Introduction to Course</p><Image src="/incomplete.svg" alt={"arrow"}  height={24} width={24} /></div>
                        </ProgressWrapper>
                    ) : null
                }
            </Wrapp>
        </CourseRight>
    </CourseWrapper>
  )
}

export default Moderators