import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import ContactInfoEditor from "../components/ContactInfoEditor";

describe("ContactInfoEditor", { timeout: 5000 }, () => {
  const mockContactInfo = {
    name: "John Doe",
    location: "London, UK",
    email: "john.doe@example.com",
    phone: "+44 7000000000",
    linkedin: "https://linkedin.com/in/johndoe",
  };

  it("renders all contact info fields with correct values", () => {
    const setContactInfoMock = vi.fn();
    render(
      <ContactInfoEditor
        contactInfo={mockContactInfo}
        setContactInfo={setContactInfoMock}
      />
    );

    // Verify that each field displays its corresponding value.
    expect(screen.getByDisplayValue(mockContactInfo.name)).toBeInTheDocument();
    expect(
      screen.getByDisplayValue(mockContactInfo.location)
    ).toBeInTheDocument();
    expect(screen.getByDisplayValue(mockContactInfo.email)).toBeInTheDocument();
    expect(screen.getByDisplayValue(mockContactInfo.phone)).toBeInTheDocument();
    expect(
      screen.getByDisplayValue(mockContactInfo.linkedin)
    ).toBeInTheDocument();
  });

  it("calls setContactInfo when an input value is changed", () => {
    const setContactInfoMock = vi.fn();
    render(
      <ContactInfoEditor
        contactInfo={mockContactInfo}
        setContactInfo={setContactInfoMock}
      />
    );

    // Find the input for the 'name' field
    const nameInput = screen.getByDisplayValue(mockContactInfo.name);
    // Simulate a change event: user changes name to "Jane Doe"
    fireEvent.change(nameInput, { target: { value: "Jane Doe" } });

    // Verify that the callback was called once with the updated object.
    expect(setContactInfoMock).toHaveBeenCalledTimes(1);
    expect(setContactInfoMock).toHaveBeenCalledWith({
      ...mockContactInfo,
      name: "Jane Doe",
    });
  });

  it("renders nothing if contactInfo is null", () => {
    const setContactInfoMock = vi.fn();
    const { container } = render(
      <ContactInfoEditor
        contactInfo={null}
        setContactInfo={setContactInfoMock}
      />
    );

    expect(container.firstChild).toBeNull();
  });
});
