import { useState } from "react";
import { Form, FormGroup, Label, Input, Row, Col, ButtonGroup, Button, Card, CardBody } from "reactstrap";
import { useNavigate } from "react-router-dom"; 
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from "../components/Header";
import Container from "../components/Container";

import "./OrderForm.css";
import { useEffect } from "react";

const pizzaBasePrice = 85.5;

export default function OrderForm({ onOrder }) {

    const [count, setCount] = useState(1);
    const [formData, setFormData] = useState({
        size: "",
        dough: "",
        ingredients: [],
        note: ""
    });
    const [ingredientsCost, setIngredientsCost] = useState(0);
    const [total, setTotal] = useState(pizzaBasePrice);
    const [valid, setValid] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const extraIngredientsCost = formData.ingredients.length * 5;
        setIngredientsCost(extraIngredientsCost);
    
        let unitPrice = pizzaBasePrice + extraIngredientsCost;
        setTotal(unitPrice * count);
    }, [count, formData.ingredients]);
    

    useEffect(() => {

        setValid(formData.dough !== "" && formData.size !== "" && count > 0);

    }, [formData]);

    const handleChange = (e) => {

        const { name, checked, value } = e.target;

        let valueToSet;

        if (name === "ingredients") {

            if (checked)
                valueToSet = [...formData.ingredients, value];
            else
                valueToSet = formData.ingredients.filter(i => i !== value);

        } else {

            valueToSet = value;
        }

        setFormData({
            ...formData,
            [name]: valueToSet
        });
    }

    const handleIncrement = (e) => {

        e.preventDefault();

        setCount(count + 1);
    }

    const handleDecrement = (e) => {

        e.preventDefault();

        setCount(Math.max(count - 1, 1));
    }

    const handleSubmit = (e) => {

        e.preventDefault();

        onOrder({
            ...formData,
            count
        });

        navigate("/status"); 
    }

    return <div className="order">
        <Header />
        <nav>
            <Container>
                <span>Anasayfa</span>&nbsp;-&nbsp;<strong>Sipariş Oluştur</strong>
            </Container>
        </nav>
        <Container>
            <main>
                <h1>Position Absolute Acı Pizza</h1>
                <div className="details">
                    <h2 className="price">85.50₺</h2>
                    <div className="ratings">
                        <span>4.9</span>
                        &nbsp;
                        <span>(200)</span>
                    </div>
                </div>
                <p>
                    Frontent Dev olarak hala position:absolute kullanıyorsan bu çok acı pizza tam sana göre. Pizza, domates, peynir ve genellikle çeşitli diğer malzemelerle kaplanmış, daha sonra geleneksel olarak odun ateşinde bir fırında yüksek sıcaklıkta pişirilen, genellikle yuvarlak, düzleştirilmiş mayalı buğday bazlı hamurdan oluşan İtalyan kökenli lezzetli bir yemektir. . Küçük bir pizzaya bazen pizzetta denir.
                </p>
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col md={6}>
                            <FormGroup tag="fieldset">
                                <legend>
                                    Boyut Seç <span className="required">*</span>
                                </legend>
                                <FormGroup check>
                                    <Input
                                        name="size"
                                        type="radio"
                                        checked={formData.size === "Küçük"}
                                        onChange={handleChange}
                                        value={"Küçük"}
                                    />
                                    {' '}
                                    <Label check>
                                        Küçük
                                    </Label>
                                </FormGroup>
                                <FormGroup check>
                                    <Input
                                        name="size"
                                        type="radio"
                                        checked={formData.size === "Orta"}
                                        onChange={handleChange}
                                        value={"Orta"}
                                    />
                                    {' '}
                                    <Label check>
                                        Orta
                                    </Label>
                                </FormGroup>
                                <FormGroup
                                    check
                                    disabled
                                >
                                    <Input
                                        name="size"
                                        type="radio"
                                        checked={formData.size === "Büyük"}
                                        onChange={handleChange}
                                        value={"Büyük"}
                                    />
                                    {' '}
                                    <Label check>
                                        Büyük
                                    </Label>
                                </FormGroup>
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup >
                                <legend>
                                    Hamur Seç <span className="required">*</span>
                                </legend>
                                <Input
                                    name="dough"
                                    type="select"
                                    placeholder="Hamur Kalınlığı"
                                    value={formData.dough}
                                    onChange={handleChange}
                                >
                                    <option value={""}>
                                        Hamur Seç
                                    </option>
                                    <option value={"İnce"}>
                                        İnce
                                    </option>
                                    <option value={"Normal"}>
                                        Normal
                                    </option>
                                    <option value={"Kalın"}>
                                        Kalın
                                    </option>
                                </Input>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <legend>Ek Malzemeler</legend>
                            <p>En Fazla 10 malzeme seçebilirsiniz. 5₺</p>
                        </Col>
                    </Row>
                    <Row>
  {["Pepperoni", "Tavuk Izgara", "Mısır", "Sarımsak", "Ananas", "Sosis", "Soğan", "Sucuk", "Biber", "Kabak", "Kanada Jambonu", "Domates"].map((ingredient, index) => (
    <Col md={3} key={index}>
      <FormGroup check>
        <Input
          name="ingredients"
          type="checkbox"
          value={ingredient}
          checked={formData.ingredients.includes(ingredient)}
          onChange={handleChange}
        />
        <Label check>{ingredient}</Label>
      </FormGroup>
    </Col>
  ))}
</Row>
                    <Row style={{ marginTop: 40 }}>
                        
                            <FormGroup>
                                <legend>Sipariş Notu</legend>
                                <Input name="note" placeholder="Siparişine eklemek istediğin bir not var mı?" value={formData.note} onChange={handleChange} />
                            </FormGroup>
                        
                    </Row>
                    <hr />
                    <Row style={{ paddingTop: "1rem" }}>
                        
                            <ButtonGroup className="count">
                                <Button onClick={handleDecrement}>-</Button>
                                <Input style={{ width: "2.5rem" }} value={count} />
                                <Button onClick={handleIncrement}>+</Button>
                            </ButtonGroup>
                       
                        <Col md={8}>
                            <Card>
                                <CardBody>
                                    <legend>Sipariş Toplamı</legend>
                                    <div className="ingredients">
                                        <span>Seçimler</span>
                                        <span>{}₺</span>
                                    </div>
                                    <div className="total">
                                        <span>Toplam</span>
                                        <span>{total}₺</span>
                                    </div>
                                </CardBody>
                                <CardBody style={{ padding: 0, margin: 0 }}>
                                    <Button disabled={!valid} className="place-order">SİPARİŞ VER</Button>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Form>
            </main>
        </Container>
    </div>;
}