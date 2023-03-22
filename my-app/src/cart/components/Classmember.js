import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { CLASSFORM_DATA } from '../api_comfig'
import { useLocation } from 'react-router-dom'

function Classmember(props) {
  //取得classform資料
  const [formData, setForm] = useState({})
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const class_form_sid = searchParams.get('classformsid')
  const getFormData = async () => {
    try {
      const response = await axios.get(`${CLASSFORM_DATA}${class_form_sid}`, {
        withCredentials: true,
      })
      console.log(response.data)
      setForm(response.data)
    } catch (error) {
      console.error(error)
    }
  }
  const { memberData } = props
  //給參與者編號
  let counter = 1
  useEffect(() => {
    getFormData()
    return () => {
      //解除功能
      console.log('unmount')
    }
  }, [])
  return (
    <>
      {memberData && memberData.sid && (
        <div className="container myWidth" key={memberData.sid}>
          <table className="mb-3">
            <td className="tableTitle h3 j-deepSec headTitle text-start">
              訂購人
            </td>
            <tbody className="j-deepGray">
              <tr className="row g-0">
                <td className="col-md-2 col-3  j-deepPri h3">姓名</td>
                <td className="col-md-10 col-9 j-deepGray  text-start h3">
                  {memberData.name}
                </td>
              </tr>
              <tr className="row g-0">
                <td className="col-md-2 col-3 j-deepPri h3">手機</td>
                <td className="col-md-10 col-9 j-deepGray text-start h3">
                  {memberData.phone}
                </td>
              </tr>
            </tbody>
          </table>
          {formData.map((a) => {
            return (
              <table className="mb-3" key={a.sid}>
                <td className="tableTitle h3 j-deepSec headTitle text-start">
                  參與者{counter++}
                </td>
                <tbody className="j-deepGray">
                  <tr className="row g-0">
                    <td className="col-md-2 col-3 j-deepPri h3 fa-16">姓名</td>
                    <td className="col-md-10 col-9 j-deepGray text-start h3">
                      {a.student}
                    </td>
                  </tr>
                  <tr className="row g-0">
                    <td className="col-md-2 col-3 j-deepPri h3">手機</td>
                    <td className="col-md-10 col-9 j-deepGray text-start h3">
                      {a.phone}
                    </td>
                  </tr>
                </tbody>
              </table>
            )
          })}
        </div>
      )}
    </>
  )
}

export default Classmember
