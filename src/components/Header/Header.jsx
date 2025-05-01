const Header = () => {
    return (
        <header>
            <div className="headerText">FARM IQ</div>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <span>Chat bot designed for farmers</span>
                <span class="material-symbols-outlined" style={{marginLeft:'5px'}}>smart_toy</span>
            </div>
        </header>
    )
}

export default Header