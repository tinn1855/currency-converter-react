export function DesignSystem() {
  return (
    <div className="container gap-10">
      <div className="row">
        <span>Button:</span>
        <button className="btn btn-primary">Primary</button>
        <button className="btn btn-secondary">Secondary</button>
      </div>
      <div className="row">
        <span>Input:</span>
        <input type="text" className="input" placeholder="Enter text" />
      </div>
      <div className="row">
        <span>Pagination:</span>
        <div className="row">
          <button className="btn ">Prev</button>
          <button className="btn ">1</button>
          <button className="btn ">2</button>
          <button className="btn ">...</button>
          <button className="btn ">9</button>
          <button className="btn ">Next</button>
        </div>
      </div>
      <div className="row">
        <span>Heading:</span>
        <div className="row">
          <h1>Heading 1</h1>
          <h2>Heading 2</h2>
          <h3>Heading 3</h3>
          <h4>Heading 4</h4>
        </div>
      </div>
      <div className="row">
        <span>Table:</span>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Currency Code</th>
              <th>Currency Name</th>
              <th>Exchange Rate</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>USD</td>
              <td>United States Dollar</td>
              <td>1.00</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
