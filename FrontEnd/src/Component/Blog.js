import React from 'react'
import TopNavbar from './TopNavbar/TopNavbar'
import Header from './Navbar/Header'

function Blog() {
  return (
    <div>
        <TopNavbar />
        <Header />
      <section class="py-5">
	<div class="container">
		<div class="row justify-content-center text-center mb-4 mb-md-5">
			<div class="col-xl-9 col-xxl-8">
				<span class="text-muted">Read More</span>
				<h2 class="display-5 fw-bold">Our Blog</h2>
				<p class="lead">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
			</div>
		</div>
		<div class="row gy-4">
			<div class="col-md-4">
				<div class="shadow p-4">
					<div class="text-muted">
						10.10.2017
					</div>
					<h2 class="fw-semibold text-primary mt-1"><a class="text-primary text-decoration-none" href="">A short engaging title</a></h2>
					<p class="mt-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum congue risus sit amet dictum malesuada. Vestibulum viverra iaculis turpis, vitae varius lectus imperdiet at. Sed ultrices, ante vitae maximus laoreet, magna quam tincidunt ex, non faucibus justo dui commodo libero.</p>
				</div>
			</div>
			<div class="col-md-4">
				<div class="shadow p-4">
					<div class="text-muted">
						10.10.2017
					</div>
					<h2 class="fw-semibold text-primary mt-1"><a class="text-primary text-decoration-none" href="">A short engaging title</a></h2>
					<p class="mt-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum congue risus sit amet dictum malesuada. Vestibulum viverra iaculis turpis, vitae varius lectus imperdiet at. Sed ultrices, ante vitae maximus laoreet, magna quam tincidunt ex, non faucibus justo dui commodo libero.</p>
				</div>
			</div>
			<div class="col-md-4">
				<div class="shadow p-4">
					<div class="text-muted">
						10.10.2017
					</div>
					<h2 class="fw-semibold text-primary mt-1"><a class="text-primary text-decoration-none" href="">A short engaging title</a></h2>
					<p class="mt-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum congue risus sit amet dictum malesuada. Vestibulum viverra iaculis turpis, vitae varius lectus imperdiet at. Sed ultrices, ante vitae maximus laoreet, magna quam tincidunt ex, non faucibus justo dui commodo libero.</p>
				</div>
			</div>
		</div>
		<div class="col-md-2 d-grid mx-auto mt-5">
			<a class="btn btn-primary btn-lg" href="">Learn more</a>
		</div>
	</div>
</section>
    </div>
  )
}

export default Blog
