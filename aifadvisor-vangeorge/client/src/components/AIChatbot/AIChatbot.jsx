import home from './AIChatbot.module.css'
import {BsFillChatDotsFill} from 'react-icons/bs'
import {IoMdClose} from 'react-icons/io'
import { useState , useEffect } from 'react'

const AIChatbot = () => {
    const [show , setShow] = useState(false)
    const [pageNo , setPageNo] = useState(0)
    const [captureInput , setCaptureInput] = useState()
    const [phone , setPhone] = useState('')
    const [pickup , setPickup] = useState('')
    const [delilvery , setDelivery] = useState('')
    const [orderId , setOrderId] = useState('')
    const [userDetails , setUserDetails] = useState([])
    const [orderStatus , setOrderStatus] = useState('')

    useEffect(() => {
        if(localStorage?.details){
            setUserDetails([JSON.parse(localStorage.getItem('details'))])
        }
    },[])  

    
    const [chatbotResponse, setChatbotResponse] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch('http://localhost:4000/api/chatbot', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ captureInput }),
        });

        const data = await res.json();
        setChatbotResponse(data.response);
    };

    const handleTrack = () => {
        const details=  userDetails.filter((element) => element.orderedId == captureInput)
    if(details.length>0){
        setOrderStatus("Your Order is in progress and will be delivered soon")
    }else{
        setOrderStatus("No orders found with this orderId")
    }
    }

    const showDialog = () => {
        setShow((prev) => !prev)
    }
    const handleNextPage =() => {
        if(pageNo===3) {
            setPageNo(3)
        }else if(pageNo == 2 && pickup===''){
            alert('enter the pickup location')
        }else{
        setPageNo(pageNo+1)
        }
    }
    const generateOrderId = () => {
        if(pageNo===3) {
            setPageNo(3)
        }else if(phone == ''){
            alert('please enter mobile number')
        }else{
        setPageNo(pageNo+1)
        const order_Number = Math.random()*90000000
        setOrderId(Math.floor(order_Number))
        }

    }
    const  redirectHome = () => {
        setPageNo(0)
        setOrderStatus('')
    }
    const handlePreviousPage = () => {
        setPageNo(pageNo-1)
    }
    const handleSubmitButton = () => {
        if(pageNo==3 && delilvery===''){
            setOrderStatus('provide the delivery location')
        }else{
            setOrderStatus(`Your Order with OrderId:${orderId} is successfull`)
        const myTimeOut = setTimeout(redirectHome, 3000)
        const obj = {
            phoneNummber : phone,
            pickupLocation : pickup,
            delilveryLocation : delilvery,
            orderedId : orderId
        }
        localStorage.setItem("details" , JSON.stringify(obj))
        }
    }
    return (
        <div>
            
            {show && (
                <div className={home.dialog_Box}>
                    {chatbotResponse && (
                                <div className={home.chatbotResponse}
                                    style={{
                                        marginTop: '20px',
                                        marginBottom: '20px',
                                        padding: '10px',
                                        backgroundColor: '#f4f4f4',
                                        borderRadius: '5px',
                                        width: 'auto !impotant'
                                    }}
                                >
                                    <strong>Answer:</strong> {chatbotResponse}
                                </div>
                            )}
                    <div className={home.header}>
                        <span className={home.heading}>Customer Assistant</span>
                    </div>
                    {pageNo === 0 && (
                        <div className={home.middle_Section}>
                            <div className={home.input_Group}>
                                <input
                                    onChange={(e) => setCaptureInput(e.target.value)}
                                    className={home.input_Field}
                                    type="text"
                                    placeholder="Ask me anything"
                                />
                                <button
                                    onClick={handleSubmit}
                                    className={home.order_Button}
                                >
                                    Ask AIRobot
                                </button>
                            </div>
                            <p className={home.paragraph}>
                                Feel free to ask us any questions, including those
                                related to investment options. Alternatively, you
                                can select one of the following options if you’re
                                ready to:
                            </p>
                            <div className={home.button_Grid}>
                                <button
                                    onClick={handleTrack}
                                    className={home.order_Button}
                                >
                                    Set Up Financial Goals
                                </button>
                                <button
                                    onClick={handleNextPage}
                                    className={home.order_Button}
                                >
                                    Invest in Growth Stocks
                                </button>
                                <button
                                    onClick={handleNextPage}
                                    className={home.order_Button}
                                >
                                    Buy Exchange-Traded Funds (ETFs)
                                </button>
                                <button
                                    onClick={handleNextPage}
                                    className={home.order_Button}
                                >
                                    Invest in Index Funds
                                </button>
                                <button
                                    onClick={handleNextPage}
                                    className={home.order_Button}
                                >
                                    High-Yield Bonds
                                </button>
                                <button
                                    onClick={handleNextPage}
                                    className={home.order_Button}
                                >
                                    Purchase Corporate Bonds
                                </button>
                                <button
                                    onClick={handleNextPage}
                                    className={home.order_Button}
                                >
                                    Venture Capital or Private Equity
                                </button>
                                <button
                                    onClick={handleNextPage}
                                    className={home.order_Button}
                                >
                                    Other High-Potential Return Options 
                                </button>
                            </div>
                            <p className={home.paragraph}>{orderStatus}</p>
                            
                        </div>
                    )}
                    {pageNo === 1 && (
                        <div className={home.place_Order}>
                            <input
                                onChange={(e) => setPhone(e.target.value)}
                                className={home.input_Field}
                                type="text"
                                placeholder="Mobile number"
                            />
                            <button
                                onClick={handlePreviousPage}
                                className={home.order_Button}
                            >
                                Back
                            </button>
                            <button
                                onClick={generateOrderId}
                                className={home.order_Button}
                            >
                                Next
                            </button>
                        </div>
                    )}
                    {pageNo === 2 && (
                        <div className={home.place_Order}>
                            <input
                                onChange={(e) => setPickup(e.target.value)}
                                className={home.input_Field}
                                type="text"
                                placeholder="Pickup location"
                            />
                            <button
                                onClick={handlePreviousPage}
                                className={home.order_Button}
                            >
                                Back
                            </button>
                            <button
                                onClick={handleNextPage}
                                className={home.order_Button}
                            >
                                Next
                            </button>
                            {orderId && (
                                <>
                                    <p className={home.order_Id}>
                                        Your OrderId: {orderId}
                                    </p>
                                    <span className={home.note}>
                                        Note: please save your order Id
                                    </span>
                                </>
                            )}
                        </div>
                    )}
                    {pageNo === 3 && (
                        <div className={home.place_Order}>
                            <input
                                onChange={(e) => setDelivery(e.target.value)}
                                className={home.input_Field}
                                type="text"
                                placeholder="Delivery location"
                            />
                            <button
                                onClick={handlePreviousPage}
                                className={home.order_Button}
                            >
                                Back
                            </button>
                            <button
                                onClick={handleSubmitButton}
                                className={home.order_Button}
                            >
                                Submit
                            </button>
                            <p className={home.paragraph}>{orderStatus}</p>
                        </div>
                    )}
                </div>
            )}
            <div className={home.fixed__Button}>
                <button onClick={showDialog} className={home.button_Wrapper}>
                    {show ? (
                        <IoMdClose className={home.message_Logo2} />
                    ) : (
                        <BsFillChatDotsFill className={home.message_Logo} />
                    )}
                </button>
            </div>
        </div>
    )
    
}

export default AIChatbot