import React, { Component } from 'react'
import styled from 'styled-components'
import prettyHtml from 'json-pretty-html'

class App extends Component {
  state = {
    q: '',
    parsed: null,
    expanded: null
  }

  handleChange = e => {
    this.setState(
      {
        q: e.target.value
      },
      () => {
        this.fetchResults()
      }
    )
  }

  fetchResults = () => {
    const { q } = this.state
    let url, params

    if (q.length > 0) {
      /* /parse endpoint */
      url = new URL('http://localhost:4567/parse')
      params = { q }
      Object.keys(params).forEach(key =>
        url.searchParams.append(key, params[key])
      )

      fetch(url)
        .then(response => response.json())
        .then(json =>
          this.setState({
            parsed: json
          })
        )

      /* /expand endpoint */
      url = new URL('http://localhost:4567/expand')
      params = { q }
      Object.keys(params).forEach(key =>
        url.searchParams.append(key, params[key])
      )

      fetch(url)
        .then(response => response.json())
        .then(json =>
          this.setState({
            expanded: json
          })
        )
    }
  }

  results = () => {
    if (this.state.q.length > 0) {
      return {
        expanded: { __html: prettyHtml(this.state.expanded) },
        parsed: { __html: prettyHtml(this.state.parsed) }
      }
    } else {
      return {
        expanded: { __html: '' },
        parsed: { __html: '' }
      }
    }
  }

  render() {
    const { expanded, parsed } = this.results()
    return (
      <Main>
        <Header>
          <Input
            type="search"
            value={this.state.q}
            onChange={this.handleChange}
            placeholder="Enter an address"
          />
        </Header>
        <Results>
          <Expanded dangerouslySetInnerHTML={expanded} />
          <Parsed dangerouslySetInnerHTML={parsed} />
        </Results>
      </Main>
    )
  }
}

const Main = styled.main`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
`

const Header = styled.header`
  display: flex;
  justify-content: center;
  background: #eee;
  padding: 0.75rem;
`

const Input = styled.input`
  background: none;
  width: 80%;
  font-size: 1rem;
  border: none;
  border-bottom: solid 1px #ccc;
  text-align: center;
  padding: 0.5em;
`

const Column = styled.section`
  border-left: solid 1px #eee;
  border-right: solid 1px #eee;
  padding: 0.5rem;

  font-family: monospace;
  color: gray;
  .json-key {
    color: green;
  }
  .json-string {
    color: blue;
  }
`

const Results = styled.div`
  display: flex;
  justify-content: stretch;
  flex: 1 0 auto;
`

const Expanded = styled(Column)`
  flex: 0 0 50%;
`

const Parsed = styled(Column)`
  flex: 0 0 50%;
`

export default App
