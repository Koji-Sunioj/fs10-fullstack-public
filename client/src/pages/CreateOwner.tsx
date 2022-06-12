import { Col, Container, Row, Alert } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import OwnerForm from "../components/OwnerForm";
import { getAllProperties } from "../redux/reducers/allproperties";

const CreateOwner =() => {
    const dispatch = useDispatch()
    const client = useSelector((state:any) => state.client)
    const properties = useSelector((state: any) => state.getAllProperties);
    const token = JSON.parse(localStorage.getItem("token") as string);

    console.log(properties)
    //const add = useSelector((state: any) => state.createProp);


    useEffect(() => {
        if (client.valid === true && client.data.isAdmin === true) {
          dispatch(getAllProperties());
          // dispatch(resetCreateProp());
        }
      }, [client]);

      async function sendOwner(event: any) {
        event.preventDefault();
        const form = event.target;
        const owner = {
          languages: form.languages.value.split(','),
          properties: Array.from(form.properties)
          .filter((option: any) => {
            return option.selected === true;
          })
          .map((property: any) => property.value),
          firstName: form.firstName.value,
          lastName: form.lastName.value,
          biography: form.biography.value,
        }
        
        console.log(owner)
      }
    


      return (
        <Container>
          {client.valid && client.data.isAdmin ? (
            <>
              <Row>
                <Col style={{ textAlign: "center" }}>
                  <h1>Create owner</h1>
                </Col>
              </Row>
              <OwnerForm sendOwner={sendOwner} properties={properties} />
            </>
          ) : (
            <Row style={{ textAlign: "center" }}>
              <Col>
                <h2>no authorization for this view</h2>
              </Col>
            </Row>
          )}
        </Container>
      );
}

export default CreateOwner