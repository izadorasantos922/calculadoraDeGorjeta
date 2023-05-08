import { useEffect, useState } from 'react'
import './App.css'

function App() {

  const [bill, setBill] = useState("");
  const [numberOfPeople, setNumberOfPeople] = useState("");
  const [percentage, setPercentage] = useState("");
  const [disable, setDisable] = useState(false);
  const [tipByPeople, setTipByPeople] = useState();
  const [totalTip, setTotalTip] = useState("");
  const [reset, setReset] = useState(false);

  const handleButtonClick = (percent) =>{
    setPercentage(percent);
    setDisable(true);
  }

  const calculateTip = () =>{
    const billFloat = parseFloat(bill);
    const numberOfPeopleInt = parseInt(numberOfPeople);
    const percentageFloat = parseFloat(percentage);

      const TipByPeople = (billFloat * ( percentageFloat / 100)) / numberOfPeopleInt;
      const TotalTip = billFloat * ( percentageFloat / 100);

      if(billFloat && numberOfPeopleInt && percentageFloat && billFloat <= 20000 && numberOfPeopleInt <= 10){
        setTipByPeople(TipByPeople.toFixed(2));
        setTotalTip(TotalTip.toFixed(2));
      }else{
        setTipByPeople(0);
        setTotalTip(0);
      }
  };

  const handleRefresh = () =>{
    window.location.reload();
  }

  useEffect(() =>{
    calculateTip();
  }, [bill, numberOfPeople, percentage]);

  useEffect(()=>{
    if(reset){
      handleRefresh();
    }
  }, [reset]);


  return (
    <>
      <main>
        <div className="informations">
          <label htmlFor='conta'>Conta</label>
            <input type="number" name="conta" id="bill"  placeholder='0'
            value={bill}
            onChange={(e)=> setBill(e.target.value)}
            />
            <h3>Porcentagem:</h3>
            <div className="buttons">
              <button onClick={() => handleButtonClick(5)}
              disabled={disable && percentage !== 5}
              className={percentage === 5 ? 'selected' : ""}
              >5%</button>
              <button onClick={() => handleButtonClick(10)}
              disabled={disable && percentage !== 10}
              className={percentage === 10 ? 'selected' : ""}>10%</button>
              <button onClick={() => handleButtonClick(15)}
              disabled={disable && percentage !== 15}
              className={percentage === 15 ? 'selected' : ""}>15%</button>
              <button onClick={() => handleButtonClick(25)}
              disabled={disable && percentage !== 25}
              className={percentage === 25 ? 'selected' : ""}>25%</button>
              <button
              onClick={() => handleButtonClick(50)}
              disabled={disable && percentage !== 50}
              className={percentage === 50 ? 'selected' : ""}>50%</button>
              <button
              onClick={() => handleButtonClick(55)}
              disabled={disable && percentage !== 55}
              className={percentage === 55 ? 'selected' : ""}>55%</button>
            </div>
            <label htmlFor='numeroDePessoas'>Número de pessoas </label>
              <input type="number" name="numeroDePessoas" id="numberOfPeople"  placeholder='0'
              value={numberOfPeople}
              onChange={(e)=> setNumberOfPeople(e.target.value)}
              />
        </div>
        <div className="result">
          <div className="tip">
            <p>Gorjeta <span>/por pessoa</span></p>
            <p className="price" >R${tipByPeople}</p>
          </div>
          <div className="division-by-people">
            <p>Total<span>de gorjeta</span></p>
            <p className="price">R${totalTip}</p>
          </div>
          <button onClick={()=> setReset(true)}>Redefinir</button>
        </div>
      </main>
    </>
  )
}

export default App
