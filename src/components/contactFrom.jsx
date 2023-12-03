export default function ContactForm(){
    return(
        <form className="contactForm contactPageSection">
                <h1 className="contactFormTitle ">Your feedback matters.</h1>
                <div className="line line1">
                    <div className="field">
                    <label htmlFor="#name">Name:</label>
                    <input type="text" id="name"/>
                    </div>
                    <div className="field field1">
                    <label htmlFor="#lastName">Last name:</label>
                    <input type="text" id="lastName"/>
                    </div>
                </div>
                <div className="line line2">
                    <div className="field">
                    <label htmlFor="#no">Phone number:</label>
                    <input type="text" id="no" />
                    </div>
                    <div className="field field2">
                    <label htmlFor="#email">Email:</label>
                    <input type="text" id="email" />
                    </div>
                </div>
                <div className="line line3">
                    <div className="field field3">
                    <label htmlFor="#msg">Your message:</label>
                    <textarea name="message" id="msg"></textarea>
                    </div>
                </div>
                <button className="sendBtn" onClick={(e)=>{e.preventDefault()}}>Send</button>
            </form>
    )
}