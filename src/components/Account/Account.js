import "./Account.css";


function Account({titre, montant, description}) {
    return (
        <section className="account">
            <div className="account-content-wrapper">
                <h3 className="account-title">{titre}</h3>
                <p className="account-amount">{montant}</p>
                <p className="account-amount-description">{description}</p>
            </div>
            <div className="account-content-wrapper cta">
                <button className="transaction-button">View transactions</button>
            </div>
        </section>
    );
}

export default Account;