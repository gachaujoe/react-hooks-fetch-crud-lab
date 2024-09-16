import React from "react";
import "whatwg-fetch";
import {
  fireEvent,
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { server } from "../mocks/server";

import App from "../components/App";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("displays question prompts after fetching", async () => {
  render(<App />);

  fireEvent.click(screen.queryByText(/View Questions/));

  expect(await screen.findByText(/lorem testum 1/g)).toBeInTheDocument();
  expect(await screen.findByText(/lorem testum 2/g)).toBeInTheDocument();
});

test("creates a new question when the form is submitted", async () => {
  render(<App />);

  // wait for first render of list (otherwise we get a React state warning)
  await screen.findByText(/lorem testum 1/g);

  // click form page
  fireEvent.click(screen.queryByText("New Question"));

  // fill out form
  fireEvent.change(screen.queryByLabelText(/Prompt/), {
    target: { value: "Test Prompt" },
  });
  fireEvent.change(screen.queryByLabelText(/Answer 1/), {
    target: { value: "Test Answer 1" },
  });
  fireEvent.change(screen.queryByLabelText(/Answer 2/), {
    target: { value: "Test Answer 2" },
  });
  fireEvent.change(screen.queryByLabelText(/Correct Answer/), {
    target: { value: "1" },
  });

  // submit form
  fireEvent.submit(screen.queryByText(/Add Question/));

  // view questions
  fireEvent.click(screen.queryByText(/View Questions/));

  expect(await screen.findByText(/Test Prompt/g)).toBeInTheDocument();
  expect(await screen.findByText(/lorem testum 1/g)).toBeInTheDocument();
});

test("deletes the question when the delete button is clicked", async () => {
  const { rerender } = render(<App />);

  fireEvent.click(screen.queryByText(/View Questions/));

  await screen.findByText(/lorem testum 1/g);

  fireEvent.click(screen.queryAllByText("Delete Question")[0]);

  // await waitForElementToBeRemoved(() => screen.queryByText(/lorem testum 1/g));

  rerender(<App />);

  await screen.findByText(/lorem testum 2/g);

  expect(screen.queryByText(/lorem testum 1/g)).not.toBeInTheDocument();
});

test("updates the answer when the dropdown is changed", async () => {
  const { rerender } = render(<App />);

  fireEvent.click(screen.queryByText(/View Questions/));

  await screen.findByText(/lorem testum 2/g);

  fireEvent.change(screen.queryAllByLabelText(/Correct Answer/)[0], {
    target: { value: "3" },
  });

  expect(screen.queryAllByLabelText(/Correct Answer/)[0].value).toBe("3");

  rerender(<App />);

  expect(screen.queryAllByLabelText(/Correct Answer/)[0].value).toBe("3");
});




// import React from "react";
// import "whatwg-fetch";
// import {
//   fireEvent,
//   render,
//   screen,
//   waitForElementToBeRemoved,
// } from "@testing-library/react";
// import "@testing-library/jest-dom/extend-expect";
// import { server } from "../mocks/server";

// import App from "../components/App";

// beforeAll(() => server.listen());
// afterEach(() => server.resetHandlers());
// afterAll(() => server.close());

// test("displays question prompts after fetching", async () => {
//   render(<App />);

//   // Wait for the questions to be fetched and displayed
//   expect(await screen.findByText(/lorem testum 1/g)).toBeInTheDocument();
//   expect(await screen.findByText(/lorem testum 2/g)).toBeInTheDocument();
// });

// test("creates a new question when the form is submitted", async () => {
//   render(<App />);

//   // Wait for the initial questions to be fetched and displayed
//   await screen.findByText(/lorem testum 1/g);

//   // Ensure the "New Question" button is present in the DOM
//   const newQuestionButton = await screen.findByText("New Question");
//   fireEvent.click(newQuestionButton);

//   // Fill out form
//   fireEvent.change(screen.queryByLabelText(/Prompt/), {
//     target: { value: "Test Prompt" },
//   });
//   fireEvent.change(screen.queryByLabelText(/Answer 1/), {
//     target: { value: "Test Answer 1" },
//   });
//   fireEvent.change(screen.queryByLabelText(/Answer 2/), {
//     target: { value: "Test Answer 2" },
//   });
//   fireEvent.change(screen.queryByLabelText(/Correct Answer/), {
//     target: { value: "1" },
//   });

//   // Submit form
//   fireEvent.submit(screen.queryByText(/Add Question/));

//   // Wait for the new question to be displayed
//   expect(await screen.findByText(/Test Prompt/g)).toBeInTheDocument();
//   expect(await screen.findByText(/lorem testum 1/g)).toBeInTheDocument();
// });

// test("deletes the question when the delete button is clicked", async () => {
//   const { rerender } = render(<App />);

//   // Wait for the initial questions to be fetched and displayed
//   await screen.findByText(/lorem testum 1/g);

//   // Click the delete button for the first question
//   fireEvent.click(screen.queryAllByText("Delete Question")[0]);

//   // Wait for the question to be removed from the DOM
//   await waitForElementToBeRemoved(() => screen.queryByText(/lorem testum 1/g));

//   rerender(<App />);

//   // Ensure the remaining question is still displayed
//   await screen.findByText(/lorem testum 2/g);

//   expect(screen.queryByText(/lorem testum 1/g)).not.toBeInTheDocument();
// });

// test("updates the answer when the dropdown is changed", async () => {
//   const { rerender } = render(<App />);

//   // Wait for the initial questions to be fetched and displayed
//   await screen.findByText(/lorem testum 2/g);

//   // Change the correct answer for the first question
//   fireEvent.change(screen.queryAllByLabelText(/Correct Answer/)[0], {
//     target: { value: "3" },
//   });

//   // Ensure the dropdown value is updated
//   expect(screen.queryAllByLabelText(/Correct Answer/)[0].value).toBe("3");

//   rerender(<App />);

//   // Ensure the dropdown value remains updated after re-render
//   expect(screen.queryAllByLabelText(/Correct Answer/)[0].value).toBe("3");
// });



// import React from "react";
// import "whatwg-fetch";
// import {
//   fireEvent,
//   render,
//   screen,
//   waitForElementToBeRemoved,
// } from "@testing-library/react";
// import "@testing-library/jest-dom/extend-expect";
// import { server } from "../mocks/server";

// import App from "../components/App";

// beforeAll(() => server.listen());
// afterEach(() => server.resetHandlers());
// afterAll(() => server.close());

// test("displays question prompts after fetching", async () => {
//   render(<App />);

//   // Wait for the questions to be fetched and displayed
//   expect(await screen.findByText(/lorem testum 1/g)).toBeInTheDocument();
//   expect(await screen.findByText(/lorem testum 2/g)).toBeInTheDocument();
// });

// test("creates a new question when the form is submitted", async () => {
//   render(<App />);

//   // Wait for the initial questions to be fetched and displayed
//   await screen.findByText(/lorem testum 1/g);

//   // Ensure the "New Question" button is present in the DOM
//   // const newQuestionButton = await screen.findByRole('button', { name: /New Question/i });
//   // fireEvent.click(newQuestionButton);
//    const newQuestionButton = await screen.findByText(/New Question/i);
//    fireEvent.click(newQuestionButton);

//   // Fill out form
//   fireEvent.change(screen.queryByLabelText(/Prompt/), {
//     target: { value: "Test Prompt" },
//   });
//   fireEvent.change(screen.queryByLabelText(/Answer 1/), {
//     target: { value: "Test Answer 1" },
//   });
//   fireEvent.change(screen.queryByLabelText(/Answer 2/), {
//     target: { value: "Test Answer 2" },
//   });
//   fireEvent.change(screen.queryByLabelText(/Correct Answer/), {
//     target: { value: "1" },
//   });

//   // Submit form
//   fireEvent.submit(screen.queryByText(/Add Question/));

//   // Wait for the new question to be displayed
//   expect(await screen.findByText(/Test Prompt/g)).toBeInTheDocument();
//   expect(await screen.findByText(/lorem testum 1/g)).toBeInTheDocument();
// });

// test("deletes the question when the delete button is clicked", async () => {
//   const { rerender } = render(<App />);

//   // Wait for the initial questions to be fetched and displayed
//   await screen.findByText(/lorem testum 1/g);

//   // Click the delete button for the first question
//   fireEvent.click(screen.queryAllByText("Delete Question")[0]);

//   // Wait for the question to be removed from the DOM
//   await waitForElementToBeRemoved(() => screen.queryByText(/lorem testum 1/g));

//   rerender(<App />);

//   // Ensure the remaining question is still displayed
//   await screen.findByText(/lorem testum 2/g);

//   expect(screen.queryByText(/lorem testum 1/g)).not.toBeInTheDocument();
// });

// test("updates the answer when the dropdown is changed", async () => {
//   const { rerender } = render(<App />);

//   // Wait for the initial questions to be fetched and displayed
//   await screen.findByText(/lorem testum 2/g);

//   // Change the correct answer for the first question
//   fireEvent.change(screen.queryAllByLabelText(/Correct Answer/)[0], {
//     target: { value: "3" },
//   });

//   // Ensure the dropdown value is updated
//   expect(screen.queryAllByLabelText(/Correct Answer/)[0].value).toBe("3");

//   rerender(<App />);

//   // Ensure the dropdown value remains updated after re-render
//   expect(screen.queryAllByLabelText(/Correct Answer/)[0].value).toBe("3");
// });



// import React from "react";
// import "whatwg-fetch";
// import {
//   fireEvent,
//   render,
//   screen,
//   waitForElementToBeRemoved,
// } from "@testing-library/react";
// import "@testing-library/jest-dom/extend-expect";
// import { server } from "../mocks/server";

// import App from "../components/App";

// beforeAll(() => server.listen());
// afterEach(() => server.resetHandlers());
// afterAll(() => server.close());

// test("displays question prompts after fetching", async () => {
//   render(<App />);

//   // Wait for the questions to be fetched and displayed
//   expect(await screen.findByText(/lorem testum 1/g)).toBeInTheDocument();
//   expect(await screen.findByText(/lorem testum 2/g)).toBeInTheDocument();
// });

// test("creates a new question when the form is submitted", async () => {
//   render(<App />);

//   // Wait for the initial questions to be fetched and displayed
//   await screen.findByText(/lorem testum 1/g);

//   // Ensure the "New Question" button is present in the DOM
//   const newQuestionButton = await screen.findByText(/New Question/i);
//   fireEvent.click(newQuestionButton);

//   // Fill out form
//   fireEvent.change(screen.queryByLabelText(/Prompt/), {
//     target: { value: "Test Prompt" },
//   });
//   fireEvent.change(screen.queryByLabelText(/Answer 1/), {
//     target: { value: "Test Answer 1" },
//   });
//   fireEvent.change(screen.queryByLabelText(/Answer 2/), {
//     target: { value: "Test Answer 2" },
//   });
//   fireEvent.change(screen.queryByLabelText(/Correct Answer/), {
//     target: { value: "1" },
//   });

//   // Submit form
//   fireEvent.submit(screen.queryByText(/Add Question/));

//   // Wait for the new question to be displayed
//   expect(await screen.findByText(/Test Prompt/g)).toBeInTheDocument();
//   expect(await screen.findByText(/lorem testum 1/g)).toBeInTheDocument();
// });

// test("deletes the question when the delete button is clicked", async () => {
//   const { rerender } = render(<App />);

//   // Wait for the initial questions to be fetched and displayed
//   await screen.findByText(/lorem testum 1/g);

//   // Click the delete button for the first question
//   fireEvent.click(screen.queryAllByText("Delete Question")[0]);

//   // Wait for the question to be removed from the DOM
//   await waitForElementToBeRemoved(() => screen.queryByText(/lorem testum 1/g));

//   rerender(<App />);

//   // Ensure the remaining question is still displayed
//   await screen.findByText(/lorem testum 2/g);

//   expect(screen.queryByText(/lorem testum 1/g)).not.toBeInTheDocument();
// });

// test("updates the answer when the dropdown is changed", async () => {
//   const { rerender } = render(<App />);

//   // Wait for the initial questions to be fetched and displayed
//   await screen.findByText(/lorem testum 2/g);

//   // Change the correct answer for the first question
//   fireEvent.change(screen.queryAllByLabelText(/Correct Answer/)[0], {
//     target: { value: "3" },
//   });

//   // Ensure the dropdown value is updated
//   expect(screen.queryAllByLabelText(/Correct Answer/)[0].value).toBe("3");

//   rerender(<App />);

//   // Ensure the dropdown value remains updated after re-render
//   expect(screen.queryAllByLabelText(/Correct Answer/)[0].value).toBe("3");
// });