import React, { useState, useEffect } from 'react'
import './css/Class.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Classpeople() {
  // const [Classform, setClassform] = useState([])
  // const [student, setstudent] = useState('')
  // const [phone, setphone] = useState('')
  const navigate = useNavigate()

  const [people, setPeople] = useState([])

  // const Submit = () => {
  //   const alldata = {
  //     student: student,
  //     phone: phone,
  //   }
  //   localStorage.setItem('key4', JSON.stringify(alldata))
  // }

  const PostForm = async () => {
    const key1 = JSON.parse(localStorage.getItem('key1')) || {}
    const key2 = JSON.parse(localStorage.getItem('key2')) || {}
    const key3 = JSON.parse(localStorage.getItem('key3')) || {}
    const key4 = JSON.parse(localStorage.getItem('key4')) || []
    try {
      // const classformId = 'C' + Date.now() // 建立 orderId

      const formObj = { ...key1, ...key2, ...key3, people: key4 }
      console.log(formObj)
      axios
        .post('http://localhost:3008/class/classform', formObj)
        .then((response) => {
          navigate(
            `/cart/classOrder01?classformsid=${response.data.classformsid}`
          )
        })
    } catch (error) {
      console.error(error)
    }
  }

  //取會員資料
  const [memberData, setMember] = useState({})
  useEffect(() => {
    const fetchMember = async () => {
      try {
        const response = await axios('http://localhost:3008/class/meber/:sid', {
          withCredentials: true,
        })

        console.log('response.data', response.data)
        setMember(response.data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchMember()
  }, [])

  //同訂購人取會員資料
  const [userName, setUserName] = useState('')
  const [phone, setPhone] = useState('')
  const handleAutoInput = () => {
    console.log(memberData.name, memberData.phone)
    userName ? setUserName('') : setUserName(memberData.name)
    phone ? setPhone('') : setPhone(memberData.phone)
  }

  // 當頁面載入時，從localStorage中讀取人數，並初始化填寫框陣列
  useEffect(() => {
    const localData = JSON.parse(localStorage.getItem('key3'))
    if (localData && localData.class_prople) {
      console.log('localData.class_prople', localData.class_prople)
      const peopleArr = []
      if (localData.class_prople > 1) {
        for (let i = 0; i < localData.class_prople; i++) {
          peopleArr.push({ student: '', phone: '' })
        }
        // setPeople(peopleArr)
      } else {
        peopleArr.push({ student: '', phone: '' })
      }
      setPeople(peopleArr)
    }
  }, [])

  // 當填寫框的內容改變時，更新localStorage
  const handleInputChange = (e, index) => {
    const { name, value } = e.target
    setPeople((prevState) => {
      const updatedPeople = [...prevState]
      updatedPeople[index][name] = value
      localStorage.setItem('key4', JSON.stringify(updatedPeople))
      return updatedPeople
    })
  }

  // 用迴圈寫填寫框
  const inputFields = people.map((person, index) => (
    <div
      key={index}
      className="j-input w-lg-50 w-md-100 d-md-flex flex-column-md-reverse align-items-center"
    >
      <div className="mb-3 px-xl-5">
        <div>
          <label htmlFor={`name${index}`}>姓名</label>
        </div>
        <div className="">
          <input
            type="text"
            className="input-text"
            name="student"
            value={person.student}
            required
            placeholder="ex.王小明"
            onChange={(e) => handleInputChange(e, index)}
          />
        </div>
      </div>
      <div className="mb-3">
        <div>
          <label htmlFor={`phone${index}`}>電話</label>
        </div>
        <div className="">
          <input
            type="tel"
            className="input-text"
            name="phone"
            value={person.phone}
            required
            placeholder="ex.0912345678"
            onChange={(e) => handleInputChange(e, index)}
          />
        </div>
      </div>
    </div>
  ))

  return (
    <>
      <section className="container-fluid">
        <div className="container nav-space">
          <div className="title-box d-flex flex-column flex-md-row align-items-center justify-content-md-between py-2">
            {/* <span className="col-auto title j-deepSec"> 課程訂購流程</span>
          <div className="title-line d-block d-md-none"></div> */}
          </div>
          <div className="step-process pb-3">
            <div className="step complete">
              <h1>1</h1>
              <h3> 選擇課程組合 </h3>
            </div>

            <div className="step complete ">
              <h1>2</h1>
              <h3>選擇Bartender</h3>
            </div>
            <div className="step complete">
              <h1>3</h1>
              <h3>選擇日期時間&人數</h3>
            </div>
            <div className="step complete">
              <h1>4</h1>
              <h3>填寫資料</h3>
            </div>
          </div>
        </div>

        {/* 填寫資料*/}
        <div className="container pt-3 pb-3 " id="my-page-element">
          <div className="title-box  justify-content-between">
            <span className="col-auto j-h2 j-deepSec">參與者</span>
            {/* <input
              type="checkbox"
              name="food"
              value="1"
              className="j-checkbox"
              // checked={checked}
              onChange={handleAutoInput}
            />

            <span className="text-align-center"> 同訂購人</span> */}
          </div>
          <div>{inputFields}</div>
          {/* <div className="title-box  justify-content-between">
            <span className="col-auto j-h2 j-deepSec pe-5">參與者</span>
            {/* <button className="o-line-btn j-h3" onClick={handleAddParticipant}>
              <i className="fa-solid fa-plus"></i>參與者
            </button> 
           <input
              type="checkbox"
              name="food"
              value="1"
              className="j-checkbox"
            />
             <span className="text-align-center"> 同訂購人</span> */}

          {/* <div className="j-input w-lg-50 w-md-100 d-md-flex flex-column-md-reverse align-items-center">
              <div className="mb-3 px-xl-5">
                <div>
                  <label for="name">姓名</label>
                </div>
                <div className="">
                  <input
                    type="text"
                    className="input-text"
                    value={student}
                    required
                    placeholder="ex.王小明"
                    onChange={(e) => {
                      let d = JSON.parse(localStorage.getItem('key4')) || {}
                      d = { ...d, student: e.target.value }
                      localStorage.setItem('key4', JSON.stringify(d))
                      setstudent(e.target.value)
                    }}
                  />
                </div>
              </div>
              <div className="mb-3">
                <div>
                  <label for="phone">電話</label>
                </div>
                <div className="">
                  <input
                    type="tel"
                    className="input-text"
                    value={phone}
                    required
                    placeholder="ex.0912345678"
                    onChange={(e) => {
                      let d = JSON.parse(localStorage.getItem('key4')) || {}
                      d = { ...d, phone: e.target.value }
                      localStorage.setItem('key4', JSON.stringify(d))
                      setphone(e.target.value)
                    }}
                  />
                </div>
              </div>
            </div>
          </div> */}
        </div>

        <div className="container ">
          <div className=" d-flex justify-content-around">
            <Link className="gray-line-btn j-h3" to="/class/Classday">
              上一步
            </Link>

            <a
              className="o-long-btn j-h3 btnCall "
              to="http://localhost:3002/cart/classOrder01"
              href="#/"
              onClick={(e) => {
                e.preventDefault()
                PostForm()
              }}
            >
              立即購買
            </a>
            {/* <Link
            className="o-long-btn j-h3 btnCall "
            to="/cart/classOrder01"
            onClick={(PostForm, Submit)}
          >
            立即購買
          </Link> */}
          </div>
        </div>
      </section>
    </>
  )
}

export default Classpeople
