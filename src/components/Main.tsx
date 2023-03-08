export function Main() {
  return (
    <main>
      <div className="container">
        <div className="main__page">
        <article>
          <div className="currency-select">
          <select>
            <option value="1">USD</option>
            <option value="2">EUR</option>
            <option value="3">UAH</option>
          </select>
          <input name="other" value=""/>
          </div>
          <div className="currency-select">
          <select>
            <option value="1">USD</option>
            <option value="2">EUR</option>
            <option value="3">UAH</option>
          </select>
          <input name="other" value=""/>
          </div>
        </article>
        <button>Conversion</button>
        </div>
      </div>
    </main>
  )
}