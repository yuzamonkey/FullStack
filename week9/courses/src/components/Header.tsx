import React from 'react'

interface HeaderProps {
  header: string;
}

const Header = ({header}: HeaderProps): JSX.Element => {
  return (
    <h1>{header}</h1>
  )
}

export default Header