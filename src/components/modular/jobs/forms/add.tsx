'use client';
import { forwardRef, useEffect, useMemo, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/core/Button';
import {
  Col,
  Container,
  Form,
  InputGroup,
  Row,
  Spinner,
} from 'react-bootstrap';
import useSWR from 'swr';
import { useSession } from '@/hooks/session';
import ReactDatePicker from 'react-datepicker';
import dayjs from 'dayjs';
import { JobCategoriesMaster, JobTypes } from '@/lib/global.types';

const schema = z.object({
  brief: z.string().nullable(),
  contractor_id: z.string().nullable(),
  description: z.string().nullable(),

  building_area_m2: z.coerce.number().nullable(),
  land_area_m2: z.coerce.number().nullable(),

  estimated_budget: z.coerce.number().nullable(),
  confirmed_budget: z.coerce.number().nullable(),

  date_start: z.coerce.string().nullable(),
  date_finish: z.coerce.string().nullable(),
  estimated_days: z.coerce.number().nullable(),
  // id: z.number(),
  jobcategory_id: z.number().nullable(),
  jobtype_id: z.number().nullable(),
  name: z.string().nullable(),

  number_of_floors: z.coerce.number().nullable(),
  number_of_trades: z.coerce.number().nullable(),
});

type Schema = z.infer<typeof schema>;

export default function Main() {
  const [visible, setVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);

  const session = useSession();

  const {
    watch,
    trigger,
    formState: { errors },
    ...form
  } = useForm<Schema>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      brief: '',
      building_area_m2: 0,
      confirmed_budget: 0,
      contractor_id: session?.user.id,
      date_finish: dayjs().format('YYYY-MM-DD'),
      date_start: dayjs().format('YYYY-MM-DD'),
      description: '',
      estimated_budget: 0,
      estimated_days: 0,
      // id: 0,
      jobcategory_id: 0,
      jobtype_id: 0,
      land_area_m2: 0,
      name: '',
      number_of_floors: 0,
      number_of_trades: 0,
    },
  });

  const {
    data: jobCategoriesOptionsData,
    isLoading: jobCategoriesOptionsLoading,
  } = useSWR('/api/v1/jobcategories', (url) =>
    fetch(url)
      .then((res) => res.json())
      // .then((res) => {
      // 	console.log(res);
      // 	return res;
      // })
      .then((res) =>
        res.data && res.data.length > 0 ? (
          res.data.map((item: JobCategoriesMaster, i: number) => (
            <option key={i} value={item.id.toString()}>
              {item.name}
            </option>
          ))
        ) : (
          <option>No categories found</option>
        )
      )
  );

  const { data: jobTypesOptionsData, isLoading: jobTypesOptionsLoading } =
    useSWR('/api/v1/jobtypes', (url) =>
      fetch(url)
        .then((res) => res.json())
        // .then((res) => {
        // 	console.log(res);
        // 	return res;
        // })
        .then((res) =>
          res.data && res.data.length > 0 ? (
            res.data.map((item: JobTypes, i: number) => (
              <option key={i} value={item.id.toString()}>
                {item.name}
              </option>
            ))
          ) : (
            <option>No types found</option>
          )
        )
    );

  const submitDisabled = useMemo(
    () => loading || jobCategoriesOptionsLoading || jobTypesOptionsLoading,
    [loading, jobCategoriesOptionsLoading, jobTypesOptionsLoading]
  );

  useEffect(() => {
    const subscription = watch(() => trigger());
    return () => subscription.unsubscribe();
  }, [watch, trigger]);

  useEffect(() => {
    form.reset();
    setSubmitSuccess(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitSuccess]);

  const handleSubmit = (data: Schema) => {
    setLoading(true);
    if (session) {
      fetch('/api/v1/jobs', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      }).then((res) => {
        if (res.ok) {
          alert('Job has been successfully created!');
          setSubmitSuccess(true);
        } else {
          alert('Job failed to be added');
        }
        setLoading(false);
      });
    } else {
      alert('Please login before posting a job');
    }
  };

  return (
    <Form
      onSubmit={(event) => {
        event.preventDefault();
        handleSubmit(form.getValues());
        form.handleSubmit((values) => handleSubmit(values));
      }}
    >
      <Form.Group className="mb-3 mt-3">
        <Container fluid>
          <Row className="g-3">
            <Col xs={12}>
              <Form.Label>Job name</Form.Label>
              <Form.Control
                isInvalid={!!errors.name?.message}
                disabled={submitDisabled}
                className={`py-3`}
                placeholder="Job name"
                {...form.register('name')}
              />
              {errors.name?.message && (
                <Form.Text as="small" className="text-danger">
                  {errors.name.message}
                </Form.Text>
              )}
            </Col>
            <Col xs={12}>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                isInvalid={!!errors.description?.message}
                disabled={submitDisabled}
                className={`py-3`}
                placeholder="Description"
                {...form.register('description')}
              />
              {errors.description?.message && (
                <Form.Text as="small" className="text-danger">
                  {errors.description.message}
                </Form.Text>
              )}
            </Col>
            <Col xs={12}>
              <Form.Label>Brief</Form.Label>
              <Form.Control
                as="textarea"
                isInvalid={!!errors.brief?.message}
                disabled={submitDisabled}
                className={`py-3`}
                placeholder="Brief"
                {...form.register('brief')}
              />
              {errors.brief?.message && (
                <Form.Text as="small" className="text-danger">
                  {errors.brief.message}
                </Form.Text>
              )}
            </Col>
            <Col xs={12} md={6}>
              <Form.Label>Building area (m₂) </Form.Label>
              <Form.Control
                type="number"
                min={0}
                step={0.01}
                isInvalid={!!errors.building_area_m2?.message}
                disabled={submitDisabled}
                className={`py-3`}
                placeholder="Building area"
                {...form.register('building_area_m2')}
              />
              {errors.building_area_m2?.message && (
                <Form.Text as="small" className="text-danger">
                  {errors.building_area_m2.message}
                </Form.Text>
              )}
            </Col>
            <Col xs={12} md={6}>
              <Form.Label>Land area (m₂) </Form.Label>
              <Form.Control
                type="number"
                min={0}
                step={0.01}
                isInvalid={!!errors.land_area_m2?.message}
                disabled={submitDisabled}
                className={`py-3`}
                placeholder="Land area"
                {...form.register('land_area_m2')}
              />
              {errors.land_area_m2?.message && (
                <Form.Text as="small" className="text-danger">
                  {errors.land_area_m2.message}
                </Form.Text>
              )}
            </Col>
            <Col xs={12} md={6}>
              <Form.Label>Estimated Budget</Form.Label>
              <Form.Control
                type="number"
                min={0}
                step={0.01}
                isInvalid={!!errors.estimated_budget?.message}
                disabled={submitDisabled}
                className={`py-3`}
                placeholder="Estimated Budget"
                {...form.register('estimated_budget')}
              />
              {errors.estimated_budget?.message && (
                <Form.Text as="small" className="text-danger">
                  {errors.estimated_budget.message}
                </Form.Text>
              )}
            </Col>
            <Col xs={12} md={6}>
              <Form.Label>Estimated days</Form.Label>
              <Form.Control
                type="number"
                min={0}
                step={1}
                isInvalid={!!errors.estimated_days?.message}
                disabled={submitDisabled}
                className={`py-3`}
                placeholder="Estimated days"
                {...form.register('estimated_days')}
              />
              {errors.estimated_days?.message && (
                <Form.Text as="small" className="text-danger">
                  {errors.estimated_days.message}
                </Form.Text>
              )}
            </Col>
            <Col xs={12} md={6}>
              <Form.Label>Date Start</Form.Label>
              <Form.Control
                type="date"
                isInvalid={!!errors.date_start?.message}
                disabled={submitDisabled}
                className={`py-3 w-100`}
                placeholder="Date Start"
                {...form.register('date_start')}
              />

              {errors.date_start?.message && (
                <Form.Text as="small" className="text-danger">
                  {errors.date_start.message}
                </Form.Text>
              )}
            </Col>
            {/* <Col xs={12} md={6}>
							<Form.Label>Date Finish</Form.Label>
							<Form.Control
								type="date"
								isInvalid={!!errors.date_finish?.message}
								disabled={submitDisabled}
								className={`py-3 w-100`}
								placeholder="Date Finish"
								{...form.register('date_finish')}
							/>
							{errors.date_finish?.message && (
								<Form.Text as="small" className="text-danger">
									{errors.date_finish.message}
								</Form.Text>
							)}
						</Col> */}
            <Col xs={12} md={6}>
              <Form.Label>Number of Floors</Form.Label>
              <Form.Control
                type="number"
                min={0}
                step={1}
                isInvalid={!!errors.number_of_floors?.message}
                disabled={submitDisabled}
                className={`py-3`}
                placeholder="Number of Floors"
                {...form.register('number_of_floors')}
              />
              {errors.number_of_floors?.message && (
                <Form.Text as="small" className="text-danger">
                  {errors.number_of_floors.message}
                </Form.Text>
              )}
            </Col>
            <Col xs={12} md={6}>
              <Form.Label>Number of Tradespersons</Form.Label>
              <Form.Control
                type="number"
                min={0}
                step={1}
                isInvalid={!!errors.number_of_trades?.message}
                disabled={submitDisabled}
                className={`py-3`}
                placeholder="Number of Tradespersons"
                {...form.register('number_of_trades')}
              />
              {errors.number_of_trades?.message && (
                <Form.Text as="small" className="text-danger">
                  {errors.number_of_trades.message}
                </Form.Text>
              )}
            </Col>
            <Col xs={12} md={6}>
              <Form.Label>Job Categories</Form.Label>
              <Form.Select
                className={`py-3`}
                isInvalid={!!errors.jobcategory_id?.message}
                disabled={submitDisabled}
                aria-label="Select categories"
                value={form.getValues('jobcategory_id')?.toString()}
                onChange={(e) =>
                  form.setValue('jobcategory_id', Number(e.currentTarget.value))
                }
              >
                <option value="0" selected disabled>
                  Select category
                </option>
                {jobCategoriesOptionsData}
              </Form.Select>

              {errors.jobcategory_id?.message && (
                <Form.Text as="small" className="text-danger">
                  {errors.jobcategory_id.message}
                </Form.Text>
              )}
            </Col>
            <Col xs={12} md={6}>
              <Form.Label>Job Types</Form.Label>
              <Form.Select
                className={`py-3`}
                isInvalid={!!errors.jobtype_id?.message}
                disabled={submitDisabled}
                aria-label="Select type"
                value={form.getValues('jobtype_id')?.toString()}
                onChange={(e) =>
                  form.setValue('jobtype_id', Number(e.currentTarget.value))
                }
              >
                <option value="0" selected disabled>
                  Select type
                </option>
                {jobTypesOptionsData}Í
              </Form.Select>

              {errors.jobtype_id?.message && (
                <Form.Text as="small" className="text-danger">
                  {errors.jobtype_id.message}
                </Form.Text>
              )}
            </Col>
            <Col xs={12}>
              <Button
                type="submit"
                disabled={submitDisabled}
                className="btn btn-warning btn-lg py-3"
              >
                {!loading ? (
                  'Save'
                ) : (
                  <Spinner
                    as="span"
                    animation="border"
                    role="status"
                    aria-hidden="true"
                  />
                )}
              </Button>
            </Col>
          </Row>
        </Container>
      </Form.Group>
    </Form>
  );
}
