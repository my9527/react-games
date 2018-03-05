import React, {Component} from 'react';

import {Link} from 'react-router-dom';


import {games} from "../utils/consts"

class PageIndex extends Component {

    render() {

        return (
            <div>
                Games with react
                <div>
                    {games.map((game, idx) => {
                        return <div key={idx}>
                            <Link to={game.url}><span>{game.name}</span></Link>
                        </div>
                    })}
                </div>
            </div>
        )
    }
}

export default PageIndex;