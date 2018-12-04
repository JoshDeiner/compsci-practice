import React from 'react'
import { Button, Icon } from 'semantic-ui-react'
// import { Link } from 'react-router-dom'
import { Link, withRouter } from 'react-router-dom'

console.log(this);

class ButtonExampleSocial extends React.Component {

  render() {
    console.log(this);
    return (
      <div>

        <Button>
          <Link to ='/'> Home </Link>
        </Button>
        <Button color='facebook'>
            <Link to ='/stacks'>Stack</Link>
        </Button>
        <Button color='queue'>
          <Link to='/queue'>Queue</Link>
        </Button>

      </div>
    )
  }

}


export default ButtonExampleSocial
