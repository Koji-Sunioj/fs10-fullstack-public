import { useState, useEffect, useCallback } from "react";
import { OwnerType, OwnerFormType } from "../types/types";
import { Row, Form, Button, Stack } from "react-bootstrap";

import mapOptions from "../utils/mapOptions";

const OwnerForm = ({
  allProperties,
  sendOwner,
  owner,
  submitted,
}: OwnerFormType) => {
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [inputLang, setInputLang] = useState("");
  const [biography, setBiography] = useState("");
  const [languages, setLanguages] = useState<string[]>([]);
  const [theProperties, setTheProperties] = useState<string[]>([]);

  const setOwner = useCallback(() => {
    const { firstName, lastName, biography, languages, properties } = owner!;
    setFirstName(firstName);
    setLastName(lastName);
    setBiography(biography);
    setLanguages(languages);
    setTheProperties(properties.map((owner) => owner._id));
  }, [owner]);

  useEffect(() => {
    if (owner) {
      setOwner();
    }
  }, [owner, setOwner]);

  const removeLang = (lang: string) => {
    const filtered = languages.filter((language: string) => language !== lang);
    setLanguages(filtered);
  };

  const parseOwnerForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { firstName, lastName, biography, languages, properties } =
      event.currentTarget;
    const owner: Omit<OwnerType, "_id"> = {
      languages: languages.value.split(","),
      properties: Array.from(properties as HTMLSelectElement["options"])
        .filter((option) => {
          return option.selected === true;
        })
        .map((property) => property.value),
      firstName:
        firstName.value[0].toUpperCase() +
        firstName.value.substring(1).toLowerCase(),
      lastName:
        lastName.value[0].toUpperCase() +
        lastName.value.substring(1).toLowerCase(),
      biography: biography.value,
    };
    sendOwner(owner);
  };

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
                mapOptions(event.currentTarget, setTheProperties);
              }}
              disabled={allProperties.loading}
            >
              {allProperties.data &&
                allProperties.data.map((property) => (
                  <option value={property._id} key={property._id}>
                    {property.title} - {property.location}
                  </option>
                ))}
            </Form.Select>
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            disabled={submittable || submitted}
          >
            Submit
          </Button>
        </Form>
      </Row>
    </>
  );
};

export default OwnerForm;
