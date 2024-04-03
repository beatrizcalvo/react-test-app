import classNames from "classnames";
import { Row, Col, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";

export default function UserInfoForm(props) {
  const { user, readOnly } = props;
  const { register, formState: { errors } } = useForm();

  // Input form validations
  const inputValidations = {
    firstName: {
      required: "First name is required",
      minLength: {
        value: 3,
        message: "First name must have at lenght 3 or greater",
      },
    },
    lastName: {
      required: "Last name is required",
      minLength: {
        value: 3,
        message: "Last name must have at lenght 3 or greater",
      }
    },
    secondLastName: {
      minLength: {
        value: 3,
        message: "Second last name must have at lenght 3 or greater",
      }
    }
  };
  
  return (
    <>
      <Form>
        <Row>
          <Col className="col-6 col-md-4">
            <Form.Group className="input-group input-group-static">
              <label for="firstName" className="font-weight-bold">First Name:</label>
              <Form.Control 
                id="firstName"
                type="text" 
                {...(!readOnly ? { placeholder: "First Name..." } : {})}
                {...register("firstName", inputValidations.firstName)}
                {...(readOnly ? { readOnly: true, plaintext: true, className: "text-sm" } : {})}
                defaultValue={user.firstName}
                isInvalid={!!errors.firstName}
              />
              <Form.Control.Feedback type="text-xs invalid">
                {errors.firstName?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col className="col-6 col-md-4">
            <Form.Group className="input-group input-group-static">
              <label for="lastName" className="font-weight-bold">Last Name:</label>
              <Form.Control 
                id="lastName"
                type="text" 
                {...(!readOnly ? { placeholder: "Last Name..." } : {})}
                {...register("lastName", inputValidations.lastName)}
                {...(readOnly ? { readOnly: true, plaintext: true, className: "text-sm" } : {})}
                defaultValue={user.lastName}
                isInvalid={!!errors.lastName}
              />
              <Form.Control.Feedback type="text-xs invalid">
                {errors.lastName?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col className={classNames("col-6 col-md-4", { "d-none": readOnly && !user.secondLastName })}>
            <Form.Group className="input-group input-group-static">
              <label for="secondLastName" className="font-weight-bold">Second Last Name:</label>
              <Form.Control 
                id="secondLastName"
                type="text" 
                {...(!readOnly ? { placeholder: "Second Last Name..." } : {})}
                {...register("secondLastName", inputValidations.secondLastName)}
                {...(readOnly ? { readOnly: true, plaintext: true, className: "text-sm" } : {})}
                defaultValue={user.secondLastName}
                isInvalid={!!errors.secondLastName}
              />
              <Form.Control.Feedback type="text-xs invalid">
                {errors.secondLastName?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col className="col-6 col-md-4 mt-4">
            <Form.Group className="input-group input-group-static">
              <label className="font-weight-bold">Gender:</label>
              <div className="choices" data-type="select-one">
                <Form.Control
                  id="gender"
                  as="select"
                >
                  {["Female", "Male"].map(item => {
                    return (<option key={item} value={item}>{item}</option>);
                  })}
                </Form.Control>
              </div>
            </Form.Group>
          </Col>
          <Col className="col-12 col-md-8 mt-4">
            <Form.Group className="input-group input-group-static">
              <label className="font-weight-bold">Birth Date:</label>
              <div className="choices" data-type="select-one">
                <div class="choices__inner">
		<div class="choices__list choices__list--single">
			<div class="choices__item choices__item--selectable" data-item="" data-id="1" data-value="English" data-custom-properties="null" aria-selected="true">
				English
			</div>
		</div>
	</div>
	<div class="choices__list choices__list--dropdown" aria-expanded="false">
		<input type="text" class="choices__input choices__input--cloned" autocomplete="off" autocapitalize="off" spellcheck="false" role="textbox" aria-autocomplete="list" aria-label="false" placeholder=""/>
		<div class="choices__list" role="listbox">
			<div id="choices--choices-language-item-choice-1" class="choices__item choices__item--choice is-selected choices__item--selectable is-highlighted" role="option" data-choice="" data-id="1" data-value="English" data-select-text="Press to select" data-choice-selectable="" aria-selected="true">
				English
			</div>
			<div id="choices--choices-language-item-choice-2" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="2" data-value="French" data-select-text="Press to select" data-choice-selectable="">
				French
			</div>
			<div id="choices--choices-language-item-choice-3" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="3" data-value="Spanish" data-select-text="Press to select" data-choice-selectable="">
				Spanish
			</div>
		</div>
	</div>
              </div>
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </>
  );
}
