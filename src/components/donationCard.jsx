import { useEffect,useState } from "react"

export default function DonationCard(){
    const [activePeriod, setActivePeriod] = useState("once");
  useEffect(() => {
    const handleClick = (period) => {
      setActivePeriod(period);
    };
    const periods = document.querySelectorAll('.periods li');
    periods.forEach((period) => {
      period.addEventListener('click', () => handleClick(period.classList[1]));
    });
    return () => {
      periods.forEach((period) => {
        period.removeEventListener('click', () => handleClick(period.classList[1]));
      });
    };
  }, []);
    return(
        <div className="donationSection contactPageSection">
            <div className="donationImage">
            </div>
        <div className="donationCard">
            <div className="header">
                <p>feed a hungry child!</p>
            </div>
            <form className="donations">
                <div className="donationOption option1">
                <input type="radio" name="option"/>
                <span>$1  for one meal.</span>
                </div>
                <div className="donationOption option2">
                <input type="radio" name="option"/>
                <span>$5 for 5 meals.</span>
                </div>
                <div className="donationOption option3">
                <input type="radio" name="option"/>
                <span>$10 for 10 meals.</span>
                </div>
                <div className="donationOption option4">
                <input type="radio" name="option"/>
                <span>$25 for 25 meals.</span>
                </div>
                <div className="donationOption option1">
                <input type="radio" name="option"/>
                <span>$</span><input id="customDonation" type="number" placeholder="Enter an amount"/>
                </div>
            </form>
            <ul className="periods">
            <li className={`period period1 ${activePeriod === 'once' ? 'active' : ''}`} onClick={() => setActivePeriod('once')}>once</li>
            <li className={`period period2 ${activePeriod === 'weekly' ? 'active' : ''}`} onClick={() => setActivePeriod('weekly')}>weekly</li>
            <li className={`period period3 ${activePeriod === 'monthly' ? 'active' : ''}`} onClick={() => setActivePeriod('monthly')}>monthly</li>
            </ul>
            <button className="continueBtn">continue</button>
        </div>
        </div>
    )
}