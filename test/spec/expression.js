describe( 'when using expressions', function( ) 
{
  it( 'can not be called without an expression', function( )
  {
    expect( function ( ) 
    {
      $( '#test' ).build( function( )
      {
        this();
      } );
    } ).toThrow( 'Invalid expression: empty or null' );
    
    expect( function ( ) 
    {
      $( '#test' ).build( function( )
      {
        this('');
      } );
    } ).toThrow( 'Invalid expression: empty or null' );
  } );
  
  describe( 'to build node', function( ) 
  {
    it( 'should be able to build expressions through a call to build', function( )
    {
      $( '#test' ).build( function( )
      {
        this.build( 'div div p' );
      } );
      
      expect( $( '#test' ).html( ) ).toEqual( '<div><div><p></p></div></div>' );
    } );
    
    it ( 'should build simple tags', function( )
    {
      $( '#test' ).build( function( )
      {
        this("h1");
      } );

      expect( $( '#test' ).html( ) ).toEqual( '<h1></h1>' );
    } );

    it ( 'should build nested tags', function( )
    {
      $( '#test' ).build( function( )
      {
        this("div h1");
      } );

      expect( $( '#test' ).html( ) ).toEqual( '<div><h1></h1></div>' );
    } );
    
    it ( 'should build nested tags with text in the innermost', function( )
    {
      $( '#test' ).build( function( )
      {
        this( 'div h1', 'test!' );
      } );

      expect( $( '#test' ).html( ) ).toEqual( '<div><h1>test!</h1></div>' );
    } );
    
    it ( 'should build nested tags with options in the innermost', function( )
    {
      $( '#test' ).build( function( )
      {
        this( 'div h1', { id: 'example' } );
      } );

      expect( $( '#test' ).html( ) ).toEqual( '<div><h1 id="example"></h1></div>' );
    } );
    
    it ( 'should build nested tags with text and options in the innermost', function( )
    {
      $( '#test' ).build( function( )
      {
        this( 'div h1', 'test!', { id: 'example' } );
      } );

      expect( $( '#test' ).html( ) ).toEqual( '<div><h1 id="example">test!</h1></div>' );
    } );
    
    it ( 'should build nested tags and apply the innermost context correctly', function( )
    {
      $( '#test' ).build( function( )
      {
        this( 'div h1', function ( ) 
        {
          this.a( 123 );
        } );
      } );

      expect( $( '#test' ).html( ) ).toEqual( '<div><h1><a>123</a></h1></div>' );
    } );
    
    it ( 'should build complex trees', function( )
    {
      $( '#test' ).build( function( )
      {
        this( 'body div ul', function ( ) 
        {
          this( 'li', function ( ) 
          {
            this.a( function ( ) 
            {
              this.text( 'Hello World' );
            },
            { 'class' : 'text' } );
          } );
        } );
      } );

      expect( $( '#test' ).html( ) ).toEqual( '<body><div><ul><li><a class="text">Hello World</a></li></ul></div></body>' );
    } );
    
    it ( 'should work with any string (not only HTML tags)', function( )
    {
      $( '#test' ).build( function( )
      {
        this( 'foo bar', function ( ) 
        {
          this( 'baz', 'Hello World' );
        } );
      } );

      expect( $( '#test' ).html( ) ).toEqual( '<foo><bar><baz>Hello World</baz></bar></foo>' );
    } );
    
    describe( 'with more advanced syntax', function( ) 
    {
      describe( 'using classes', function( ) 
      {
        it ( 'should build an element with a class', function( )
        {
          $( '#test' ).build( function( )
          {
            this('foo.myclass');
          } );

          expect( $( '#test' ).html( ) ).toEqual( '<foo class="myclass"></foo>' );
        } );

        it ( 'should build an nested element with a class', function( )
        {
          $( '#test' ).build( function( )
          {
            this( 'foo bar.myclass' );
          } );

          expect( $( '#test' ).html( ) ).toEqual( '<foo><bar class="myclass"></bar></foo>' );
        } );

        it ( 'should build elements with one class each', function( )
        {
          $( '#test' ).build( function( )
          {
            this( 'foo.myclass bar.yourclass' );
          } );

          expect( $( '#test' ).html( ) ).toEqual( '<foo class="myclass"><bar class="yourclass"></bar></foo>' );
        } );

        it ( 'should build an element with more than one class', function( )
        {
          $( '#test' ).build( function( )
          {
            this( 'foo.hello.word' );
          } );

          expect( $( '#test' ).html( ) ).toEqual( '<foo class="hello word"></foo>' );
        } );

        it ( 'should work with nested scopes', function( )
        {
          $( '#test' ).build( function( )
          {
            this( 'foo.one', function( )
            {
              this( 'bar.two baz.three', function( )
              {
                this( 'qux.four', "Hello World!!!" );
              } );
            } );
          } );

          expect( $( '#test' ).html( ) ).toEqual( '<foo class="one"><bar class="two"><baz class="three"><qux class="four">Hello World!!!</qux></baz></bar></foo>' );
        } );
      } );
      describe( 'using ids', function( )
      {
        it ( 'should build an element with an id', function( )
        {
          $( '#test' ).build( function( )
          {
            this('foo#myid');
          } );

          expect( $( '#test' ).html( ) ).toEqual( '<foo id="myid"></foo>' );
        } );
        
        it ( 'should build an nested element with an id', function( )
        {
          $( '#test' ).build( function( )
          {
            this( 'foo bar#myid' );
          } );

          expect( $( '#test' ).html( ) ).toEqual( '<foo><bar id="myid"></bar></foo>' );
        } );
        
        it ( 'should build elements with id', function( )
        {
          $( '#test' ).build( function( )
          {
            this( 'foo#outer bar#inner' );
          } );

          expect( $( '#test' ).html( ) ).toEqual( '<foo id="outer"><bar id="inner"></bar></foo>' );
        } );
      } );
      
      describe( 'using all the power', function( )
      {
        it( 'should assign a class before an id', function( )
        {
          $( '#test' ).build( function( )
          {
            this( 'div.class#id' );
          } );

          expect( $( '#test div' ).hasClass( 'class' ) ).toBe( true );
          expect( $( '#test div' ).attr( 'id' ) ).toEqual( 'id' );
        } );
        
        it( 'should assign an id before a class', function( )
        {
          $( '#test' ).build( function( )
          {
            this( 'div#id.class' );
          } );

          expect( $( '#test div' ).hasClass( 'class' ) ).toBe( true );
          expect( $( '#test div' ).attr( 'id' ) ).toEqual( 'id' );
        } );
        
        it( 'should work', function( ) 
        {
          $( '#test' ).build( function( )
          {
            this( 'div.container table#mytable', function( ) 
            {
              this.thead( { 'class': 'table-head' } );
              this( 'tbody.style1.style2', function( ) 
              {
                this( 'tr#row01.even', function( ) 
                {
                  this.text( 'mydata' );
                } );
              } );
            } );
          } );
        
          expect( $( '#test' ).html( ) ).toEqual( '<div class="container"><table id="mytable"><thead class="table-head"></thead><tbody class="style1 style2"><tr id="row01" class="even">mydata</tr></tbody></table></div>' );
        } );
      } );
    } );
  } );
} );