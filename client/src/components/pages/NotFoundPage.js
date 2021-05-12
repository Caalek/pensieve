import React from 'react'
import Button from 'react-bootstrap/Button'

export default function NotFoundPage() {
  return (
    <div className="center">
      <h1 className="not-found">Error 404</h1>
      <h1>This page could not be found. Maybe go back to the home page?</h1>
      <a href="/">
        <div className="mt-5"><Button size="lg">Go back home</Button></div>
      </a>
    </div>
  )
}