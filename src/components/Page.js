import React, { useState, useEffect } from 'react'

function Page() {
  const [expData, setExpData] = useState({
    message: "",
    price: "",
    curr: "",
    date: "",
  });
  const [expDataList, setExpDataList] = useState([]);
  const [totalexp, setTotalExp] = useState(0);

  const getTotalexp =() => {
    const result = expDataList.reduce(function(sum, ele) { 
      return sum + Number(ele.price);
    }, 0)
    setTotalExp(result)
  }

  // Avoid aync await inside USeEffect
  useEffect(() => {
    getTotalexp()
  }, [expData, expDataList]);


  const submitData = () =>  {
    console.log(expData)

  
    

    setExpDataList (expDataList => [...expDataList, {...expData}])
    
    
    console.log(totalexp)
    
    console.log(expDataList)
  }
  // GEt data from form for submit data
  const handleSubmit = (event) =>{
    event.preventDefault();
    submitData();
    setExpData({
      message: "",
      price: "",
      curr: "",
      date: "",
    });
    console.log(expDataList)
  }

  function handleChange (event) {
    switch(event.target.name) 
    {
      case "message":
        {
        setExpData({...expData, "message": event.target.value})
        break;
      }
      case "price":
        {
        setExpData({...expData, "price": event.target.value})
        break;
      }
      case "currency":
        {
          console.log(event.target.name)
          console.log(event.target.value)
        setExpData({...expData, "curr": event.target.value})
        break;
      }
      case "date":
        {
          console.log(event.target.value)
        setExpData({...expData, "date": event.target.value})
        break;
      }
      default:
        break;
    }
    console.log(expData)
  }

  return (
    <div>

        {/* <!-- component --> */}
  
    
    <div className="flex min-h-screen items-center justify-start bg-white">
      <div className="mx-auto w-full max-w-lg">
        <h1 className="text-4xl font-medium">Expense Tracker</h1>
        <p className="mt-3">Add an expense</p>
    
        <form action="https://api.web3forms.com/submit" className="mt-10"
        onSubmit={handleSubmit}>
        
        {/* <!-- This is a working contact form. Get your free access key from: https://web3forms.com/  --> */}
    
          <input type="hidden" name="access_key" value="YOUR_ACCESS_KEY_HERE" /> 
          <div className="grid gap-6 sm:grid-cols-2">
          <div className="relative z-0 col-span-2">
              <input type="text" name="message" rows="2" className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0" placeholder=" "
              value={expData.name}
              onChange={handleChange}/>
              <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600 peer-focus:dark:text-blue-500">Expense Description</label>
            </div>
            
            <div className="relative z-0 col-span-2" >
                <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
                    <div className="relative mt-1 rounded-md shadow-sm">
                        {/* <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <span className="text-gray-500 sm:text-sm">$</span>
                        </div> */}
                        <input type="text" name="price" id="price" 
                        className="block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                         placeholder="0.00"
                         value={expData.price}
                         onChange={handleChange}/>
                        <div className="absolute inset-y-0 right-0 flex items-center">
                        <label htmlFor="currency" className="sr-only">Currency</label>
                        <select id="currency" name="currency" className="h-full rounded-md border-transparent bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        value={expData.curr}
                        onChange={handleChange}>
                            <option id='0' value=' '>Currency</option>
                            <option id='1' value='USD'>USD</option>
                            <option id='2' value='CAD'>CAD</option>
                            <option id='3' value='EUR'>EUR</option>
                            <option id='4' value='INR'>INR</option>
                        </select>
                        </div>
                    </div>
                </div>
            </div>

            
            <div className="relative z-0 col-span-2">
              <input type="date" name="date" className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0" placeholder=" " 
              value={expData.date}
              onChange={handleChange}  />
              <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600 peer-focus:dark:text-blue-500">Expense date</label>
            </div>

          </div>
          <button type="submit" className="mt-5 rounded-md bg-black px-10 py-2 text-white">ADD</button>
        </form>
      </div>
    </div>

  {/* TABLE */}
  <div className='flex flex-col justify-center items-center mb-10'>
  <table className="border-collapse border border-slate-500 ">
    <thead >
      <tr>
        <th className="border border-slate-600 ...">Expense</th>
        <th className="border border-slate-600 ...">Amount</th>
        <th className="border border-slate-600 ...">Currency</th>
        <th className="border border-slate-600 ...">Date</th>
      </tr>
    </thead>
    <tbody>
      {
        expDataList && expDataList.map((exp, ind) => (
          <tr key={ind}>
            <td className="border border-slate-700 ...">{exp.message}</td>
            <td className="border border-slate-700 ...">{exp.price}</td>
            <td className="border border-slate-700 ..."> {exp.curr}</td>
            <td className="border border-slate-700 ...">{exp.date}</td>
          </tr>
        ))
      }
      <tr>
            <th className="border border-slate-700 ...">Total</th>
            <th className="border border-slate-700 ...">{totalexp}</th>
            {/* <td className="border border-slate-700 ..."> </td>
            <td className="border border-slate-700 ..."></td> */}
          </tr>
      
    </tbody>
  </table>
  {/* <p></p>
  <button className="mt-5 rounded-md bg-black px-10 py-2 text-white"
  onClick={handleTotal}>Total Expense</button> */}
  </div>
  {/* END */}
    </div>
  )
}

export default Page
