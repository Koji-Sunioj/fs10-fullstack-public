import { Row, Form, Button, Stack } from "react-bootstrap";
import { useState, useEffect, useCallback } from "react";
import { OwnerType, OwnerFormType } from "../types/types";

const OwnerForm = ({ properties, sendOwner, owner }: OwnerFormType) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [biography, setBiography] = useState("");
  const [languages, setLanguages] = useState<string[]>([]);
  const [inputLang, setInputLang] = useState("");
  const [theProperties, setTheProperties] = useState<string[]>([]);

  const setOwner = useCallback(() => {
    setFirstName(owner!.firstName);
    setLastName(owner!.lastName);
    setBiography(owner!.biography);
    setLanguages(owner!.languages);
    setTheProperties(owner!.properties.map((owner) => owner._id));
  }, [owner]);

  useEffect(() => {
    if (owner) {
      setOwner();
    }
  }, [owner]);

  function removeLang(lang: string) {
    const filtered = languages.filter((language: string) => language !== lang);
    setLanguages(filtered);
  }

  function parseOwnerForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const owner: Omit<OwnerType, "_id"> = {
      languages: form.languages.value.split(","),
      properties: Array.from(form.properties as HTMLSelectElement["options"])
        .filter((option) => {
          return option.selected === true;
        })
        .map((property) => property.value),
      firstName:
        form.firstName.value[0].toUpperCase() +
        form.firstName.value.substring(1).toLowerCase(),
      lastName:
        form.lastName.value[0].toUpperCase() +
        form.lastName.value.substring(1).toLowerCase(),
      biography: form.biography.value,
    };
    sendOwner(owner);
  }

  const submittable =
    firstName.length < 3 ||
    lastName.length < 3 ||
    biography.length < 11 ||
    languages.length < 1;
  return (
    <>
      <Row style={{ backgroundColor: "white" }}>
        <Form onSubmit={parseOwnerForm}>
          <Form.Group className="mb-3">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              placeholder="John... Suzy... Ali Baba..."
              name="firstName"
              defaultValue={firstName}
              onChange={(event) => {
                setFirstName(event.target.value);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              placeholder="Smith... Obama... "
              name="lastName"
              defaultValue={lastName}
              onChange={(event) => {
                setLastName(event.target.value);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Biography</Form.Label>
            <Form.Control
              name="biography"
              as="textarea"
              placeholder="i am a great host and here to show you good time walla"
              rows={3}
              value={biography}
              onChange={(event) => {
                setBiography(event.target.value);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Languages</Form.Label>

            <Form.Control
              placeholder="English... Swahili... "
              type="search"
              value={inputLang}
              onKeyDown={(event: React.KeyboardEvent<HTMLTextAreaElement>) => {
                if (
                  event.key === "Enter" &&
                  !languages.some((language: string) =>
                    language.includes(inputLang)
                  )
                ) {
                  event.preventDefault();
                  setLanguages([
                    ...languages,
                    event.currentTarget.value.toLowerCase(),
                  ]);
                  setInputLang("");
                }
              }}
              onChange={(event) => {
                setInputLang(event.target.value);
              }}
            />
            <input type="hidden" value={languages} name="languages" />
            <Stack direction="horizontal" gap={3} style={{ marginTop: "20px" }}>
              {languages.length > 0 &&
                languages.map((language) => (
                  <Button
                    variant="success"
                    key={language}
                    onClick={() => {
                      removeLang(language);
                    }}
                  >
                    {language}
                  </Button>
                ))}
            </Stack>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Properties</Form.Label>
            <Form.Select
              multiple
              name="properties"
              value={theProperties}
              onChange={(event) => {
                setTheProperties(
                  Array.from(
                    event.currentTarget as HTMLSelectElement["options"]
                  )
                    .filter((option) => {
                      return option.selected === true;
                    })
                    .map((owner) => owner.value)
                );
              }}
            >
              {properties.data !== null &&
                properties.data.map((property) => (
                  <option value={property._id} key={property._id}>
                    {property.title} - {property.location}
                  </option>
                ))}
            </Form.Select>
          </Form.Group>
          <Button variant="primary" type="submit" disabled={submittable}>
            Submit
          </Button>
        </Form>
      </Row>
    </>
  );
};

export default OwnerForm;
