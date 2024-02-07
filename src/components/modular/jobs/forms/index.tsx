'use client';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form } from 'react-bootstrap';

// const schema = z.object({
//   name: z.string(),
//   age: z.number(),
// });

// type Schema = z.infer<typeof schema>;

const schema = z.object({
  id: z.string(),
  //   name: z.string().min(1, { message: 'Name must not be empty' }).nullable(),
  jobCategory: z.enum(['Contractor', 'Category2', 'Category3']),
  requirement: z.enum(['Requirements', 'Requirement2', 'Requirement3']),
  schedule: z
    .date()
    .min(new Date(), { message: 'Schedule must be a future date' }),
  location: z.string().min(1, { message: 'Location must not be empty' }),
  estimatedBudget: z
    .number()
    .min(0, { message: 'Estimated budget must be greater than or equal to 0' }),
});

type Schema = z.infer<typeof schema>;
export default function Main() {
  const [visible, setVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

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
      jobCategory: 'Contractor', // Set default values here if needed
      requirement: 'Requirements',
      schedule: new Date(),
      location: '',
      estimatedBudget: 0,
    },
  });
  useEffect(() => {
    const subscription = watch(() => trigger());
    return () => subscription.unsubscribe();
  }, [watch, trigger]);

  const onSubmit = (data: Schema) => {
    console.log(data);
  };

  //   const { watch, trigger, ...form } = useForm<Schema>({
  //     resolver: zodResolver(schema),
  //     mode: 'onChange',
  //     reValidateMode: 'onChange',
  //     defaultValues: { name: '', age: 0 },
  //   });

  //   useEffect(() => {
  //     const subscription = watch(() => trigger());
  //     return () => subscription.unsubscribe();
  //   }, [watch, trigger]);

  //   const onSubmit = (data: Schema) => {
  //     console.log(data);
  //   };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Form.Group>
        <label>Job Category</label>
        <select {...form.register('jobCategory')} defaultValue="">
          <option value="" disabled>
            Select Job Category
          </option>
          <option value="Category1">Category 1</option>
          <option value="Category2">Category 2</option>
          <option value="Category3">Category 3</option>
        </select>
        {errors.jobCategory && (
          <p className="text-danger">{errors.jobCategory.message}</p>
        )}

        <label>Requirement</label>
        <select {...form.register('requirement')} defaultValue="">
          <option value="" disabled>
            Select Requirement
          </option>
          <option value="Requirement1">Requirement 1</option>
          <option value="Requirement2">Requirement 2</option>
          <option value="Requirement3">Requirement 3</option>
        </select>
        {errors.requirement && (
          <p className="text-danger">{errors.requirement.message}</p>
        )}

        <label>Schedule</label>
        <input
          type="date"
          {...form.register('schedule')}
          placeholder="Schedule"
        />
        {errors.schedule && (
          <p className="text-danger">{errors.schedule.message}</p>
        )}

        <label>Location</label>
        <input
          type="text"
          {...form.register('location')}
          placeholder="Location"
        />
        {errors.location && (
          <p className="text-danger">{errors.location.message}</p>
        )}

        <label>Estimated Budget</label>
        <input
          type="number"
          {...form.register('estimatedBudget')}
          placeholder="Estimated Budget"
        />
        {errors.estimatedBudget && (
          <p className="text-danger">{errors.estimatedBudget.message}</p>
        )}

        <button type="submit">Submit</button>
      </Form.Group>
    </form>
    // <form onSubmit={form.handleSubmit(onSubmit)}>
    //   <input {...form.register('name')} />
    //   <input {...form.register('age', { valueAsNumber: true })} type="number" />
    //   <input type="submit" />
    // </form>
  );
}
