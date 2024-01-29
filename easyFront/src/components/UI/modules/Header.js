const Header = () => {
    return (
      <div className="Header">
        {/* 여기 로그인버튼은 조건절로 로그인 시에는 로그아웃창이나 미니프로필로 전환인데 생각해보면 접근제한때문에 그냥 상시로 로그아웃해도 괜찮을듯 */}
        쉽게말해(로고) <button>로그인버튼</button>
      </div>
    );
  }
  
  export default Header;