import { useState } from "react"
import { useHistory } from "react-router"

export default function Signin(props) {
  const [user, setUser] = useState({
    email: "",
    password: "",
  })

  const { setAuthenticatedUser } = props

  const history = useHistory()

  const handleSubmit = event => {
    event.preventDefault()

    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...user }),
    }

    fetch("http://localhost:3030/signin", fetchOptions)
      .then(res => res.json())
      .then(data => {
        const user = data.user

        console.log("Inside Signin Fetch: ", user)

        if (user) {
          setAuthenticatedUser(user)

          localStorage.setItem("user", JSON.stringify(user))

          history.push("/secure")
        }
      })
  }

  const handleChange = event => {
    const name = event.target.name
    const value = event.target.value

    setUser({ ...user, [name]: value })
  }

  return (
    <main>
      <form className="form-stack" onSubmit={handleSubmit}>
        <h2>User Sign In</h2>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" onChange={handleChange} />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={handleChange}
        />
        <button type="submit">Sign In</button>
      </form>
    </main>
  )
}
