import { useMemo } from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';
import { ToastPosition } from 'react-bootstrap/esm/ToastContainer';

export default function Main({ array, duration = 300, position = 'top-center' }: { array: any[]; duration: number; position: ToastPosition }) {
	const toasts = useMemo(
		() =>
			array.map((item, i) => (
				<>
					<Toast key={i} delay={duration} autohide>
						<Toast.Header>
							<img src='holder.js/20x20?text=%20' className='rounded me-2' alt='' />
							<strong className='me-auto'>Bootstrap</strong>
							<small>11 mins ago</small>
						</Toast.Header>
						<Toast.Body>Hello, world! This is a toast message.</Toast.Body>
					</Toast>
				</>
			)),
		[array, duration]
	);

	return (
		<>
			<ToastContainer position={position}>{toasts}</ToastContainer>
		</>
	);
}
