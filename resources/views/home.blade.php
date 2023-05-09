@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            @foreach($items as $item)
            <div class="card mt-4">
                <div class="card-header d-flex justify-content-between">
                    <h3 class="mt-2">Заказ №{{ $item['id'] }}</h3>
                    <p style="padding-top: 12px; margin: 0;">{{ $item['date'] }}</p>
                </div>

                <div class="card-body d-flex justify-content-between">
                    <div class="card-content">
                        <h3>Имя: {{ $item['name'] }}</h3>
                        <h3>Телефон: {{ $item['phone'] }}</h3>
                        <h3>Почта: {{ $item['email'] }} </h3>
                        <h3>Адрес: {{ $item['address'] }} </h3>
                    </div>
                    <div class="card-products w-50">
                        @foreach($item['orderItems'] as $orderItem)
                        <div class="card-product text-end">
                            <h3>{{$orderItem['product']['name']}}: {{$orderItem['quantity']}} шт.</h3>
                        </div>
                        <hr>
                        @endforeach
                        <h3 class="text-end">Общая стоимость: {{$item['total']}} тенге</h3>
                    </div>
                </div>
            </div>
            @endforeach
        </div>
    </div>
</div>
@endsection