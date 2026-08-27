## Grid

It's 12 column fluid grid fits into any container. See sass reference for more details. Default gutter width is 20px for all breakpoint.

```
<div class="row">
    <div class="small-2 large-4 columns"></div>
    <div class="small-4 large-4 columns"></div>
    <div class="small-6 large-4 columns"></div>
</div>
<div class="row">
    <div class="medium-4 large-3 columns"></div>
    <div class="medium-4 large-6 columns"></div>
    <div class="medium-4 large-3 columns"></div>
</div>
<div class="row">
    <div class="large-6 columns"></div>
    <div class="large-6 columns"></div>
</div>
```

For fixed layout use `.container` class as wrapper

```
<div class="container">
    <div class="row">
        <div class="columns large-6"></div>
        <div class="columns large-6"></div>
    </div>
</div>
```

Single column

```
<div class="column">Your content here</div>
```

```
<div class="row">
    <div class="columns large-12">Your HTML here</div>
</div>
```

Nested grid

```
<div class="row">
    <div class="columns large-4"></div>
    <div class="columns large-8">
        <div class="row">
            <div class="columns large-6"></div>
            <div class="columns large-6"></div>
        </div>
    </div>
</div>
```

Incomplete grid layout

```
<div class="row">
    <div class="columns large-5"></div>
    <div class="columns large-6 new-row"></div>
    <div class="columns large-6"></div>
</div>
```

Offset

```
<div class="row">
	<div class="columns large-offset-2 large-4"></div>
	<div class="columns large-6"></div>
</div>
```

Pull or Push

```
<div class="row">
	<div class="columns large-push-6 large-6"></div>
	<div class="columns large-pull-6 large-6"></div>
</div>
```
