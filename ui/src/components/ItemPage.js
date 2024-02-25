import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
// import BookDetailsCard from "./bookDetailsCard"
import { apiConnector } from '../services/apiconnector';
// import { fetchCourseDetails } from "../services/operations/courseDetailsAPI"




function CourseDetails() {
 



  // Getting courseId from url parameter
  const { Itemid } = useParams()
  // console.log(`course id: ${courseId}`)

  // Declear a state to save the course details
  const [response, setResponse] = useState(null);
  useEffect(() => {
    const getSearchItems = async () => {
      const response = await apiConnector(
        'POST',
        'http://localhost:4000/api/v1/BookDetails',
        {
          Itemid,
        }
      );

      setResponse(response.data.bookDetails);
    };
    getSearchItems();
  }, [Itemid]);

  // console.log("response: ", response)

  // Calculating Avg Review count
  // const [avgReviewCount, setAvgReviewCount] = useState(0)
  // useEffect(() => {
  //   const count = GetAvgRating(response?.data?.courseDetails.ratingAndReviews)
  //   setAvgReviewCount(count)
  // }, [response])

  // console.log("avgReviewCount: ", avgReviewCount)

  // // Collapse all
  // const [collapse, setCollapse] = useState("")
  const [isActive, setIsActive] = useState(Array(0))
//   const handleActive = (id) => {
//     // console.log("called", id)
//     setIsActive(
//       !isActive.includes(id)
//         ? isActive.concat([id])
//         : isActive.filter((e) => e != id)
//     )
//   }


 



  const {
    _id: course_id,
    BookTitle,
    BookDiscription,
    BookAuthor,
    YearOfPublication,
    Publisher,
    ImageURLS,
    ImageURLM,
    ImageURLL,
    ratingAndReviews,
    price,
    seller,
    tag,
    category,
    usersBrought,
    createdAt,

  } = response.data?.bookDetails

  



  return (
    <>
      <div className={`relative w-full bg-richblack-800`}>
        {/* Hero Section */}
        <div className="mx-auto box-content px-4 lg:w-[1260px] 2xl:relative ">
          <div className="mx-auto grid min-h-[450px] max-w-maxContentTab justify-items-center py-8 lg:mx-0 lg:justify-items-start lg:py-0 xl:max-w-[810px]">
            <div className="relative block max-h-[30rem] lg:hidden">
              <div className="absolute bottom-0 left-0 h-full w-full shadow-[#161D29_0px_-64px_36px_-28px_inset]"></div>
              <img
                src={ImageURLL}
                alt="course thumbnail"
                className="aspect-auto w-full"
              />
            </div>
            <div
              className={`z-30 my-5 flex flex-col justify-center gap-4 py-5 text-lg text-richblack-5`}
            >
              <div>
                <p className="text-4xl font-bold text-richblack-5 sm:text-[42px]">
                  {BookTitle}
                </p>
              </div>
              <p className={`text-richblack-200`}>{BookDiscription}</p>
              <div className="text-md flex flex-wrap items-center gap-2">
                <span className="text-yellow-25">avg rating dalo</span>
                {/* <RatingStars Review_Count={avgReviewCount} Star_Size={24} /> */}
                <span>{`(${ratingAndReviews.length} reviews)`}</span>
                <span>{`${usersBrought.length} users brought`}</span>
              </div>
              <div>
                <p className="">
                  Created By 
                </p>
              </div>
              <div className="flex flex-wrap gap-5 text-lg">
                <p className="flex items-center gap-2">
                  {" "}
                   Created at {createdAt}
                </p>
                <p className="flex items-center gap-2">
                  {" "}
                   English
                </p>
              </div>
            </div>
            <div className="flex w-full flex-col gap-4 border-y border-y-richblack-500 py-4 lg:hidden">
              <p className="space-x-3 pb-4 text-3xl font-semibold text-richblack-5">
                Rs. {price}
              </p>
              <button className="yellowButton">
                Buy Now
              </button>
              <button className="blackButton">Add to Cart</button>
            </div>
          </div>
          {/* Courses Card */}
          {/* <div className="right-[1rem] top-[60px] mx-auto hidden min-h-[600px] w-1/3 max-w-[410px] translate-y-24 md:translate-y-0 lg:absolute  lg:block">
            <CourseDetailsCard
              course={response?.data?.bookDetails}
          
            />
          </div> */}
        </div>
      </div>
      <div className="mx-auto box-content px-4 text-start text-richblack-5 lg:w-[1260px]">
        <div className="mx-auto max-w-maxContentTab lg:mx-0 xl:max-w-[810px]">
          {/* What will you learn section */}
          <div className="my-8 border border-richblack-600 p-8">
            <p className="text-3xl font-semibold">What you'll learn</p>
            <div className="mt-5">
              {BookDiscription}            </div>
          </div>

          {/* Course Content Section */}
        
        
            {/* Course Details Accordion */}
         

            {/* Author Details */}
            <div className="mb-12 py-4">
              <p className="text-[28px] font-semibold">Author</p>
              <div className="flex items-center gap-4 py-4">
                
                <p className="text-lg">{`${seller.firstName} ${seller.lastName}`}</p>
              </div>
            
            </div>
          </div>
        </div>
     
    
      
    </>
  )
}

export default CourseDetails
