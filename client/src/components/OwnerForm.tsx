import { Row, Form, Button, Stack } from "react-bootstrap";
import { useState, useEffect } from "react";
import moment from "moment";

const OwnerForm = ({ properties, sendOwner, owner }: any) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [biography, setBiography] = useState("");
  const [languages, setLanguages] = useState<any>([]);
  const [inputLang, setInputLang] = useState("");
  const [theProperties, setTheProperties] = useState<string[]>([]);

  /*useEffect(() => {
    if (property) {
      setProperty();
    }
  }, [property]);


  function setProperty() {
    setTitle(property.title);
    setDescription(property.description);
    setCategory(property.category);
    setPrice(Number(property.nightlyRate));
    setRooms(Number(property.rooms));
    setLocation(property.location);
    setBuildDate(property.buildDate.split("T")[0]);
    setTheOwners(property.owners.map((owner: any) => owner._id));
  }*/

  function removeLang(lang: string) {
    console.log(lang);
    const filtered = languages.filter((language: any) => language !== lang);
    setLanguages(filtered);
  }

  const submittable =
    firstName.length < 3 ||
    lastName.length < 3 ||
    biography.length < 11 ||
    languages.length < 1
  return (
    <>
      <Row style={{ backgroundColor: "white" }}>
        <Form onSubmit={sendOwner}>
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
                  event.preventDefault()
                  setLanguages([...languages, event.currentTarget.value.toLowerCase()]);
                  setInputLang("")
                }
              }}
              onChange={(event) => {
                setInputLang(event.target.value);
              }}
            />
            <input type="hidden" value={languages} name="languages"/>
            <Stack direction="horizontal" gap={3} style={{ marginTop: "20px" }}>
              {languages.length > 0 &&
                languages.map((language: any) => (
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
                setTheProperties(Array.from(event.target)
                .filter((option: any) => {
                  return option.selected === true;
                })
                .map((owner: any) => owner.value));
              }}
            >
              {properties.data !== null &&
                properties.data.map((property: any) => (
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
 