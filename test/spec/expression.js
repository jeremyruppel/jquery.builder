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
            }, { class: 'text' } );
          } );
        } );
      } );

      expect( $( '#test' ).html( ) ).toEqual( '<body><div><ul><li><a class="text">Hello World</a></li></ul></div></body>' );
    } );
  } );
} );