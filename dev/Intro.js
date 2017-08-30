/* ------------- Imports -------------- */
import React, { Component } from 'react';
import { PrismCode } from 'react-prism';
import rawStyles from 'raw-loader!./styles.txt';

class Intro extends Component {

  render() {
    return (
      <div className="mb-4">
        <h3>Intro</h3>
        <p className="mb-4">
          Say hello to the best react form library you have ever used!
          <code>react-savage-form</code> is an exstensive, simple, and efficent
          solution to creating simple to complex forms in react. Out of the box
          you get the ability to grab and manipulate values; set errors,
          warnings, and successes; customize your inputs, and much more!
        </p>
        <h3>Motivation</h3>
        <p className="mb-4">
          Simplicity and efficency. This form works in IE! and its fast!
          There are many other libraries that exsist, but they dont function in
          IE and, can get pretty complex. I must give credit to <a href="https://github.com/tannerlinsley/react-form">react-form</a> as
          this library was the inspiration for building <code>react-savage-form</code>.
        </p>
        <h3>Notes</h3>
        <p className="mb-4">
          Just wanted to point out that this webpage is styled with Bootstrap4,
          and the stylesheet you see below. The reason to point this out is
          that, by default, your inputs will not look the way mine do! Under
          the hood the default components are just inputs, selects, textareas,
          etc. I just added some simple styles to make them look good for
          presentation. So if you see classes in the example code like
          <code>"mb-4"</code>, or if you are quick to point out that inputs are
          not block elements by default dont freak out! Focus on the core
          structure of the forms.
        </p>
        <pre className="mb-4">
          <PrismCode className="language-css">
            {rawStyles}
          </PrismCode>
        </pre>
      </div>
    );
  }
}

export default Intro;
